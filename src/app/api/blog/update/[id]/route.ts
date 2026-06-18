import {
  validateBody,
  UpdateBlogBody,
  getUpdateBlogSchema,
} from "@/src/lib/validators";
import { withErrorHandler } from "@/src/lib/with-error-handler";
import { NextRequest, NextResponse } from "next/server";
import HttpStatusCode from "@/src/lib/http-status-code";
import { ApiResponse } from "@/src/lib/api-response";
import dbConnect from "@/src/lib/mongodb";
import { AppError } from "@/src/lib/app-error";
import { headers } from "next/headers";
import { authorizeRole, toRoleMask } from "@/src/lib/role-validator";
import { ensureUserExistByEmail } from "@/src/service/user-service";
import {
  createBlog,
  deleteBlogImageByBlogId,
  ensureBlogExistById,
  updateBlogById,
  uploadBlogImage,
} from "@/src/service/blog-service";

async function handler(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) {
  await dbConnect();

  const headerList = await headers();
  const email = headerList.get("x-user-email");
  const userFromDb = await ensureUserExistByEmail(email!);
  const role = userFromDb?.role ?? "";

  if (!role) {
    throw new AppError({
      message: "Role is required",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  // ensure role is admin | hr_manager | manager
  authorizeRole({
    allowedRolesMask:
      toRoleMask({ role: "ADMIN" }) |
      toRoleMask({ role: "HR_MANAGER" }) |
      toRoleMask({ role: "MANAGER" }),
    role: toRoleMask({ role }),
    message: "Unauthorized: do not have permission to create blog",
  });

  const params = await context.params;
  const blogId = params.id;

  const blogFromDb = await ensureBlogExistById(blogId);

  const formData = await req.formData();

  const body = {
    user: userFromDb._id.toString(),
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
    publishedDate: formData.get("publishedDate"),
    releaseDate: formData.get("releaseDate"),
  };

  const blogData = validateBody<UpdateBlogBody>(getUpdateBlogSchema(), body);

  const imageFile = formData.get("image") as Blob | null;
  let uploadedImagePath: string | null = null;

  if (imageFile) {
    // delete old img
    if (blogFromDb.imagePath) {
      await deleteBlogImageByBlogId(blogId);
    }

    // upload new img
    uploadedImagePath = await uploadBlogImage(imageFile);
  }

  const { image, ...blogDataWithoutImage } = blogData;

  const blogDataWithImagePath = {
    ...blogDataWithoutImage,
    imagePath: uploadedImagePath,
  };

  const blog = await updateBlogById(blogId, blogDataWithImagePath);

  return NextResponse.json(
    ApiResponse.created({
      data: blog,
      message: "Blog updated successfully!",
    }),
    {
      status: HttpStatusCode.CREATED,
    },
  );
}

export const POST = withErrorHandler(handler);

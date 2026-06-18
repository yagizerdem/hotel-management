import { randomUUID } from "crypto";
import { AppError } from "../lib/app-error";
import { bucket } from "../lib/firebase-admin";
import HttpStatusCode from "../lib/http-status-code";
import { CreateBlogBody, UpdateBlogBody } from "../lib/validators";
import { Blog, IBlog } from "../models/blog";
import { User } from "../models/user";

async function createBlog({
  _id,
  blogData,
}: {
  _id: string;
  blogData: CreateBlogBody;
}) {
  const userFromDb = await User.findById(_id);

  if (!userFromDb) {
    throw new AppError({
      message: `User with id ${_id} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  const blog = new Blog({ ...blogData, user: userFromDb._id });
  await blog.save();

  return blog;
}

async function deleteBlogById(blogId: string) {
  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  return deletedBlog;
}

async function ensureBlogExistById(blogId: string): Promise<IBlog> {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError({
      message: `Blog with id ${blogId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return blog;
}

async function updateBlogById(blogId: string, blogData: UpdateBlogBody) {
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { $set: blogData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedBlog) {
    throw new AppError({
      message: `Blog with id ${blogId} does not exist`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return updatedBlog;
}

async function uploadBlogImage(blob: Blob) {
  try {
    const buffer = Buffer.from(await blob.arrayBuffer());

    const fileName = `blog-images/${randomUUID()}.png`;

    await bucket.file(fileName).save(buffer, {
      metadata: {
        contentType: blob.type || "image/png",
      },
    });

    return fileName;
  } catch (error) {
    console.log("Error uploading image:", error);

    throw new AppError({
      message: "Failed to upload image",
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      isOperational: true,
    });
  }
}

async function getBlogImage(blogId: string) {
  const blog = await ensureBlogExistById(blogId);

  const file = bucket.file(blog.imagePath);

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 1000 * 60 * 60, // 1 hour
  });

  return url;
}

export {
  createBlog,
  deleteBlogById,
  ensureBlogExistById,
  updateBlogById,
  uploadBlogImage,
  getBlogImage,
};

import { AppError } from "../lib/app-error";
import HttpStatusCode from "../lib/http-status-code";
import { CreateBlogBody, UpdateBlogBody } from "../lib/validators";
import { Blog } from "../models/blog";
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

async function ensureBlogExistById(blogId: string) {
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

export { createBlog, deleteBlogById, ensureBlogExistById, updateBlogById };

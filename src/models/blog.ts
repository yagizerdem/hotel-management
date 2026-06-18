import mongoose, { Types } from "mongoose";

export interface IBlog extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
  releaseDate: Date;
  imagePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    releaseDate: { type: Date, default: Date.now },
    imagePath: { type: String, required: false },
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export { Blog };

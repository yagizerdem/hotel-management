import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
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
    imageUri: { type: String, required: false },
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export { Blog };

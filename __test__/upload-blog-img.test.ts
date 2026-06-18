import { beforeAll, test } from "vitest";
import { blobFrom, Blob } from "fetch-blob/from.js";
import {
  ensureBlogExistById,
  getBlogImage,
  uploadBlogImage,
} from "@/src/service/blog-service";
import { bucket } from "@/src/lib/firebase-admin";
import { IBlog } from "@/src/models/blog";
import dbConnect from "@/src/lib/mongodb";

beforeAll(async () => {
  await dbConnect();
});

test("Upload test", async () => {
  // console.log("bucket:", bucket.name);
  // const absPath =
  //   "C:\\Users\\yagiz\\OneDrive\\Desktop\\hotel-management\\public\\image\\home-page-chatto.png";
  // const fsBlob: Blob = await blobFrom(absPath, "image/png");
  // const path = await uploadBlogImage(fsBlob);
  // console.log("Uploaded image path:", path);
});

test("download test", async () => {
  // const imageUrl = await getBlogImage("6a340c9d7779d89d0a556be5");
  // console.log("Downloaded image URL:", imageUrl);
});

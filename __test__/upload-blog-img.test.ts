import { test } from "vitest";
import { blobFrom, Blob } from "fetch-blob/from.js";
import { uploadBlogImage } from "@/src/service/blog-service";
import { bucket } from "@/src/lib/firebase-admin";

test("Upload test", async () => {
  console.log("bucket:", bucket.name);

  const absPath =
    "C:\\Users\\yagiz\\OneDrive\\Desktop\\hotel-management\\public\\image\\home-page-chatto.png";

  const fsBlob: Blob = await blobFrom(absPath, "image/png");

  const path = await uploadBlogImage(fsBlob);
  console.log("Uploaded image path:", path);
});

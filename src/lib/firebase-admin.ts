import { readFileSync } from "fs";
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import path from "path";
const { getStorage } = require("firebase-admin/storage");

const serviceAccountPath = path.join(process.cwd(), "firebase-adminsdk.json");

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET_NAME,
      });

const bucket = getStorage(app).bucket();

export { bucket, app };

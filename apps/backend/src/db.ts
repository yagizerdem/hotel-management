import mongoose from "mongoose";

async function connectToDatabase() {
  if (process.env.MONGO_URI) {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
      });
  } else {
    throw Error("MONGO_URI is not defined");
  }
}

export { connectToDatabase };

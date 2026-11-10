"use server";

import { User } from "@models/user";
import dbConnect from "@lib/db";

export async function signUp(user: Partial<User>) {
  await dbConnect();

  return "fucker";
}

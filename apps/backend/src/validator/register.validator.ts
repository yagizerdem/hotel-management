import { UserRole } from "@/models/enums.js";
import { email, z } from "zod";

const passwordRegx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function getRegisterValidator() {
  const validator = z.object({
    email: email(),
    password: z.string().regex(passwordRegx, {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    role: z.enum(Object.values(UserRole)),
  });

  return validator;
}

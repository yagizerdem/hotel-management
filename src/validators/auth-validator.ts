import { z } from "zod";

export function getSignUpSchema() {
  const name = (message: string) =>
    z
      .string({ error: message })
      .trim()
      .min(1, { error: message })
      .max(50, { error: "Use 50 characters or fewer" });

  /**
   * Sign-up input for a customer account. Error messages match the sign-up
   * form, so the same schema can check the form and the server action.
   */
  const signUpSchema = z
    .object({
      firstName: name("Enter your first name"),
      lastName: name("Enter your last name"),
      email: z
        .string({ error: "Enter a valid email address" })
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: "Enter a valid email address" })),
      // Optional Turkish number without the +90 prefix. Spaces and dashes are
      // dropped, and an empty value becomes undefined.
      phone: z
        .string()
        .optional()
        .transform((value) => value?.replace(/\D/g, "") || undefined)
        .refine((value) => value === undefined || value.length === 10, {
          error: "Enter a 10-digit phone number, for example 532 000 0000",
        }),
      password: z
        .string({
          error: "Use at least 8 characters, with a letter and a number",
        })
        .max(128, { error: "Use 128 characters or fewer" })
        .refine(
          (value) =>
            value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value),
          {
            error: "Use at least 8 characters, with a letter and a number",
          },
        ),
      confirmPassword: z.string({ error: "The passwords don't match" }),
      marketingOptIn: z.boolean().default(false),
      acceptTerms: z.literal(true, {
        error: "Accept the terms of use and privacy policy to continue",
      }),
    })
    .refine((values) => values.confirmPassword === values.password, {
      error: "The passwords don't match",
      path: ["confirmPassword"],
      // Zod skips object refinements when another field fails. Compare the
      // passwords anyway, so every error shows at once like on the form.
      when: ({ value }) => {
        const { password, confirmPassword } = value as {
          password?: unknown;
          confirmPassword?: unknown;
        };
        return (
          typeof password === "string" && typeof confirmPassword === "string"
        );
      },
    });

  return signUpSchema;
}

export type SignUpInput = z.input<ReturnType<typeof getSignUpSchema>>;
export type SignUpValues = z.output<ReturnType<typeof getSignUpSchema>>;

export function getSignInSchema() {
  /**
   * Sign-in input. Only checks that both fields are filled in: the password
   * rules belong to sign-up, and a wrong password is the server's answer.
   */
  const signInSchema = z.object({
    email: z
      .string({ error: "Enter a valid email address" })
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: "Enter a valid email address" })),
    password: z
      .string({ error: "Enter your password" })
      .min(1, { error: "Enter your password" }),
    rememberMe: z.boolean().default(false),
  });

  return signInSchema;
}

export type SignInInput = z.input<ReturnType<typeof getSignInSchema>>;
export type SignInValues = z.output<ReturnType<typeof getSignInSchema>>;

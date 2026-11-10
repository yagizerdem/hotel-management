"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CircleAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "cn";
import { toast } from "sonner";
import { Checkbox } from "@/src/components/ui/checkbox";
import { getSignInSchema } from "@/src/validators/auth-validator";
import { isKeyof } from "@lib/util";
import { signInWithCredentials } from "@/src/actions/auth-actions";

type Values = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = {
  email: "",
  password: "",
  rememberMe: false,
};

const inputClassName =
  "h-[52px] w-full rounded-sm border border-border bg-popover px-3.5 text-[15px] text-foreground transition-colors outline-none placeholder:text-foreground/45 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive";

const labelClassName = "mb-1.5 block text-sm font-medium tracking-[0.02em]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] leading-5 text-destructive">
      {message}
    </p>
  );
}

function validate(values: Values): Errors {
  const result = getSignInSchema().safeParse(values);
  if (result.success) return {};

  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const path = issue.path[0];
    if (path !== undefined && isKeyof(path, values)) {
      errors[path] ??= issue.message;
    }
  }
  return errors;
}

export function SignInForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Values, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const errors = validate(values);
  // Show an error once the person has left the field or tried to submit.
  const errorFor = (field: keyof Values) =>
    touched[field] || submitted ? errors[field] : undefined;

  function update<K extends keyof Values>(field: K, value: Values[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function touch(field: keyof Values) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setSubmitted(true);
      const firstInvalid = Object.keys(errors)[0];
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
        toast.error("Enter your email address and password.", {
          position: "top-right",
          duration: 5000,
        });
        return;
      }
      setIsLoading(true);
      const response = await signInWithCredentials(values);
      if (!response.success) {
        toast.error(response.error || "Sign in failed. Try again.", {
          position: "top-right",
          duration: 5000,
        });
        return;
      }

      toast.success("You're signed in.", {
        position: "top-right",
        duration: 5000,
      });
      router.push("/home");
      // Re-render server components so they see the new session.
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  const emailError = errorFor("email");
  const passwordError = errorFor("password");

  return (
    <>
      <Link
        href="/home"
        className="inline-flex items-center gap-1.5 text-sm font-medium tracking-[0.02em] text-secondary hover:underline focus-visible:underline focus-visible:outline-none"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Back to Bilge Hotel
      </Link>

      <h1 className="mt-10 font-[family-name:var(--font-bodoni)] text-[32px] leading-10 sm:text-4xl sm:leading-[44px]">
        Welcome back
      </h1>
      <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
        Sign in to book a room and manage your reservations.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-5"
      >
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email address
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => touch("email")}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
              className={cn(inputClassName, emailError && "pr-10")}
            />
            {emailError && (
              <CircleAlert
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-destructive"
              />
            )}
          </div>
          <FieldError id="email-error" message={emailError} />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-4">
            <label
              htmlFor="password"
              className="text-sm font-medium tracking-[0.02em]"
            >
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-secondary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
              onBlur={() => touch("password")}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "password-error" : undefined}
              className={cn(inputClassName, "pr-11")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-1 focus-visible:ring-secondary focus-visible:outline-none"
            >
              {showPassword ? (
                <EyeOff aria-hidden className="size-5" />
              ) : (
                <Eye aria-hidden className="size-5" />
              )}
            </button>
          </div>
          <FieldError id="password-error" message={passwordError} />
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm leading-snug">
          <Checkbox
            name="rememberMe"
            checked={values.rememberMe}
            onCheckedChange={(checked) => update("rememberMe", checked)}
            className="mt-0.5 rounded-[2px] border-[1.5px] border-foreground/60"
          />
          Keep me signed in on this device
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 h-[52px] w-full rounded-sm bg-primary px-6 text-sm font-medium tracking-[0.02em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          New to Bilge Hotel?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-secondary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
}

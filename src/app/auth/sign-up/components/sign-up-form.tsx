"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleAlert, Eye, EyeOff } from "lucide-react";
import { cn } from "cn";
import { Checkbox } from "@/src/components/ui/checkbox";
import { getSignUpSchema } from "@/src/validators/auth-validator";
import { isKeyof } from "@lib/util";
import { toast } from "sonner";
import { signUp } from "@/src/actions/auth-actions";
import { useRouter } from "next/navigation";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  marketingOptIn: boolean;
  acceptTerms: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  marketingOptIn: false,
  acceptTerms: false,
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
  const schema = getSignUpSchema();
  const result = schema.safeParse(values);
  if (!result.success) {
    const errors: Errors = {};
    for (const issue of result.error.issues) {
      const path = issue.path[0];
      // Check against values: errors starts empty, so it has no keys yet.
      if (path !== undefined && isKeyof(path, values)) {
        errors[path] ??= issue.message;
      }
    }
    return errors;
  }
  return {};
}

export function SignUpForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Values, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
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
      setServerErrors([]);
      event.preventDefault();
      setSubmitted(true);

      const firstInvalid = Object.keys(errors)[0];
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
        toast.error("Please enter all required fields correctly.", {
          position: "top-right",
          duration: 5000,
        });
        return;
      }

      const r = await signUp(values);
      if (!r.success) {
        toast.error(r.error || "Sign up failed. Please try again.", {
          position: "top-right",
          duration: 5000,
        });
        if (r.fieldErrors) {
          setServerErrors(Object.values(r.fieldErrors));
        }
        return;
      }

      toast.success("Sign up successful!", {
        position: "top-right",
        duration: 5000,
      });
      router.push("/home");
    } finally {
      setIsLoading(false);
    }
  }

  const textField = (
    field: "firstName" | "lastName" | "email" | "confirmPassword",
    label: string,
    props: React.ComponentProps<"input">,
  ) => {
    const error = errorFor(field);
    return (
      <div>
        <label htmlFor={field} className={labelClassName}>
          {label}
        </label>
        <div className="relative">
          <input
            id={field}
            name={field}
            value={values[field]}
            onChange={(e) => update(field, e.target.value)}
            onBlur={() => touch(field)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field}-error` : undefined}
            className={cn(inputClassName, error && "pr-10")}
            {...props}
          />
          {error && (
            <CircleAlert
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-destructive"
            />
          )}
        </div>
        <FieldError id={`${field}-error`} message={error} />
      </div>
    );
  };

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
        Create your account
      </h1>
      <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
        A verified account lets you book online and keeps your reservations
        safe.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-5"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
          {textField("firstName", "First name", {
            autoComplete: "given-name",
            required: true,
          })}
          {textField("lastName", "Last name", {
            autoComplete: "family-name",
            required: true,
          })}
        </div>

        {textField("email", "Email address", {
          type: "email",
          autoComplete: "email",
          inputMode: "email",
          required: true,
        })}

        <div>
          <label htmlFor="phone" className={labelClassName}>
            Phone number{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-sm border border-r-0 border-border bg-muted px-3.5 text-sm font-medium select-none">
              +90
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="532 000 0000"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => touch("phone")}
              aria-invalid={Boolean(errorFor("phone"))}
              aria-describedby={errorFor("phone") ? "phone-error" : undefined}
              className={cn(inputClassName, "rounded-l-none")}
            />
          </div>
          <FieldError id="phone-error" message={errorFor("phone")} />
        </div>

        <div>
          <label htmlFor="password" className={labelClassName}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
              onBlur={() => touch("password")}
              aria-invalid={Boolean(errorFor("password"))}
              aria-describedby="password-hint"
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
          <p
            id="password-hint"
            className={cn(
              "mt-1.5 text-[13px] leading-5",
              errorFor("password")
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {errorFor("password") ??
              "At least 8 characters, with a letter and a number"}
          </p>
        </div>

        {textField("confirmPassword", "Confirm password", {
          type: showPassword ? "text" : "password",
          autoComplete: "new-password",
          required: true,
        })}

        <div className="flex flex-col gap-3 pt-2">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug">
            <Checkbox
              name="marketingOptIn"
              checked={values.marketingOptIn}
              onCheckedChange={(checked) => update("marketingOptIn", checked)}
              className="mt-0.5 rounded-[2px] border-[1.5px] border-foreground/60"
            />
            Email me seasonal offers and hotel events
          </label>

          <div>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={values.acceptTerms}
                onCheckedChange={(checked) => {
                  update("acceptTerms", checked);
                  touch("acceptTerms");
                }}
                aria-invalid={Boolean(errorFor("acceptTerms"))}
                aria-describedby={
                  errorFor("acceptTerms") ? "acceptTerms-error" : undefined
                }
                className="mt-0.5 rounded-[2px] border-[1.5px] border-foreground/60"
              />
              <span>
                I accept the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-secondary hover:underline"
                >
                  terms of use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-secondary hover:underline"
                >
                  privacy policy
                </Link>
              </span>
            </label>
            <FieldError
              id="acceptTerms-error"
              message={errorFor("acceptTerms")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 h-[52px] w-full rounded-sm bg-primary px-6 text-sm font-medium tracking-[0.02em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
          disabled={isLoading}
        >
          Create account
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-secondary hover:underline"
          >
            Sign in
          </Link>
        </p>

        {serverErrors.length > 0 && (
          <div className="mt-2 text-sm text-destructive">
            {serverErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </>
  );
}

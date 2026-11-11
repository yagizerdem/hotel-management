import { useId } from "react";
import {
  field,
  fieldError,
  fieldHint,
  fieldLabel,
} from "@/src/app/booking/lib/ui";

type TextFieldProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  label: string;
  hint?: string;
  error?: string;
  onChange: (value: string) => void;
};

/** A labelled input with its hint and error tied to it for screen readers. */
export function TextField({
  label,
  hint,
  error,
  onChange,
  className = "",
  ...props
}: TextFieldProps) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        onChange={(event) => onChange(event.target.value)}
        className={field}
        {...props}
      />
      {hint && (
        <p id={`${id}-hint`} className={fieldHint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

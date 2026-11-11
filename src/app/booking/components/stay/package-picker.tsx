import { CheckIcon } from "lucide-react";
import { packages, type PackageId } from "@/src/app/home/data/sd";

type PackagePickerProps = {
  value: PackageId;
  onChange: (value: PackageId) => void;
};

/** The two packages as radio options, with what each one includes. */
export function PackagePicker({ value, onChange }: PackagePickerProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Package</legend>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {packages.map((pkg) => {
          const checked = pkg.id === value;
          return (
            <label
              key={pkg.id}
              className={`flex cursor-pointer flex-col gap-3 rounded-sm border p-4 transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-secondary/30 ${
                checked
                  ? "border-secondary bg-secondary/5 outline outline-1 outline-secondary"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block font-[family-name:var(--font-bodoni)] text-xl">
                    {pkg.name}
                  </span>
                  <span className="mt-1 block text-sm text-foreground/70">
                    {pkg.summary}
                  </span>
                </span>
                <input
                  type="radio"
                  name="package"
                  value={pkg.id}
                  checked={checked}
                  onChange={() => onChange(pkg.id)}
                  className="mt-1 size-4 shrink-0 accent-[var(--secondary)]"
                />
              </span>
              <ul className="flex flex-col gap-1.5 text-sm">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-secondary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="border-t border-border pt-3 text-sm text-foreground/70">
                {pkg.earlyDiscount}% off when booked a month ahead
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

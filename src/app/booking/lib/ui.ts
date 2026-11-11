const focus =
  "focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none";

// 52px fields, as the design system asks for touch-friendly forms.
export const field = `h-13 w-full rounded-sm border border-input/50 bg-popover px-3 text-base text-foreground outline-none transition-colors focus-visible:border-secondary aria-invalid:border-destructive`;

export const fieldLabel = "text-sm font-medium";

export const fieldHint = "text-sm text-foreground/65";

export const fieldError = "text-sm text-destructive";

export const primaryButton = `inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 ${focus}`;

export const secondaryButton = `inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-foreground px-6 text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50 ${focus}`;

export const textAction = `inline-flex items-center gap-1 rounded-sm text-sm font-medium text-secondary underline-offset-4 hover:underline ${focus}`;

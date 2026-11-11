// Shared class names, so buttons and fields look the same on every screen.

const focus =
  "focus-visible:ring-3 focus-visible:ring-secondary/35 focus-visible:outline-none";

/** The one main action of a page: Bougainvillea, used once per screen. */
export const primaryButton = `inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 ${focus}`;

/** Bordered pine button for everything else. */
export const secondaryButton = `inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-foreground/80 px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50 ${focus}`;

/** A destructive action, such as restoring over the live database. */
export const dangerButton = `inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-destructive px-4 text-sm font-medium text-white transition-colors hover:bg-destructive/90 disabled:opacity-50 ${focus}`;

/** An Aegean text action inside a row or a panel. */
export const textAction = `inline-flex items-center gap-1 text-sm font-medium text-secondary underline-offset-4 hover:underline ${focus} rounded-sm`;

export const field = `h-10 w-full rounded-sm border border-input/60 bg-popover px-3 text-sm outline-none transition-colors focus-visible:border-secondary disabled:opacity-60`;

export const fieldLabel = "text-sm font-medium";

export const fieldHint = "text-xs text-foreground/65";

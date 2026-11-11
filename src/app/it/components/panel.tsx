type PanelProps = {
  title: string;
  id?: string;
  description?: string;
  /** A small action next to the title, such as "View all". */
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** A titled, hairline-framed section of a screen. */
export function Panel({
  title,
  id,
  description,
  action,
  children,
  className = "",
}: PanelProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 border border-border bg-popover ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-4">
        <div>
          <h2 id={headingId} className="text-base font-semibold">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-sm text-foreground/65">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

type PageHeaderProps = {
  title: string;
  description: string;
  /** The page's main action, shown on the right. */
  action?: React.ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-foreground/70">{description}</p>
      </div>
      {action && <div className="flex shrink-0 gap-3">{action}</div>}
    </header>
  );
}

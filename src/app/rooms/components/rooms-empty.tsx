import { DoorClosedIcon } from "lucide-react";

type RoomsEmptyProps = {
  title: string;
  body: string;
  onClear?: () => void;
};

export function RoomsEmpty({ title, body, onClear }: RoomsEmptyProps) {
  return (
    <div className="mx-auto my-16 flex max-w-6xl flex-col items-start gap-3 border border-dashed border-foreground/25 p-8">
      <DoorClosedIcon aria-hidden className="size-6 text-foreground/50" />
      <h2 className="font-[family-name:var(--font-bodoni)] text-2xl">
        {title}
      </h2>
      <p className="max-w-md text-sm text-foreground/70">{body}</p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-2 inline-flex h-10 items-center rounded-sm border border-foreground px-4 text-sm transition-colors hover:bg-foreground hover:text-background focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

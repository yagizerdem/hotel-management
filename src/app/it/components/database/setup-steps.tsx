"use client";

import { CheckIcon } from "lucide-react";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { SetupStep } from "@/src/app/it/lib/types";
import { secondaryButton } from "@/src/app/it/lib/ui";

/**
 * The steps that set up the app on an empty server. They run in order, so
 * a fresh install is one button rather than a manual checklist.
 */
export function SetupSteps({ steps }: { steps: SetupStep[] }) {
  const done = steps.filter((step) => step.done).length;

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <ol className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex gap-3">
            <span
              aria-hidden
              className={`flex size-6 shrink-0 items-center justify-center rounded-sm text-xs font-semibold tabular-nums ${
                step.done
                  ? "bg-secondary text-secondary-foreground"
                  : "border border-foreground/40"
              }`}
            >
              {step.done ? <CheckIcon className="size-3.5" /> : index + 1}
            </span>
            <span>
              <span className="block text-sm font-medium">
                {step.title}
                <span className="sr-only">
                  {step.done ? " (done)" : " (to do)"}
                </span>
              </span>
              <span className="block text-sm text-foreground/65">
                {step.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground/70">
          {done === steps.length
            ? "This server is set up."
            : `${done} of ${steps.length} steps done.`}
        </p>
        <button
          type="button"
          onClick={() => notConnected("Setting up a new server")}
          className={secondaryButton}
        >
          Set up on a new server
        </button>
      </div>
    </div>
  );
}

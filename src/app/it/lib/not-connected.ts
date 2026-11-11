import { toast } from "sonner";

/**
 * Stands in for an action until the backend exists, so every button in the
 * panel can be tried without pretending the work was done.
 */
export function notConnected(action: string) {
  toast.info(`${action} isn't connected to the server yet.`, {
    description: "This panel is a design preview with sample data.",
  });
}

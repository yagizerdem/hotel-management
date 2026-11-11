import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False on the server and during hydration, true afterwards. Use it to keep
 * client-only state (like the signed-in user, which loads after the page)
 * out of the first render, so it matches the server's HTML.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

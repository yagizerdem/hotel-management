import { handlers } from "@/src/auth/auth";

// Auth.js endpoints under /api/auth: session, CSRF token, sign-in callbacks
// and sign-out.
export const { GET, POST } = handlers;

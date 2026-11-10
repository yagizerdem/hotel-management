"use client";

import { useState } from "react";

export function MembershipSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: connect to the member registration API once it exists.
    setSubmitted(true);
  }

  return (
    <section id="membership" className="scroll-mt-16 bg-foreground text-background">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Be the first to hear about offers and events
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-background/75">
          Become a member and we&apos;ll email you our seasonal offers and hotel
          events.
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-10 rounded-sm border border-background/20 px-4 py-3"
          >
            Thanks! We&apos;ll send offers and event news to {email}.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="membership-email" className="sr-only">
              Email address
            </label>
            <input
              id="membership-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-sm border border-background/25 bg-background/5 px-4 text-background outline-none placeholder:text-background/50 focus-visible:border-background/60 focus-visible:ring-3 focus-visible:ring-background/20"
            />
            <button
              type="submit"
              className="h-12 rounded-sm bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-background/40 focus-visible:outline-none"
            >
              Become a member
            </button>
          </form>
        )}

        <p className="mt-5 text-sm text-background/60">
          Membership also helps us verify your bookings.
        </p>
      </div>
    </section>
  );
}

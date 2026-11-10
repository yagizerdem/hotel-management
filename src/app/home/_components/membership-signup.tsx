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
    <section id="uyelik" className="scroll-mt-16 bg-pine text-limestone">
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h2 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight sm:text-5xl">
          Kampanya ve etkinliklerden ilk siz haberdar olun
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-limestone/75">
          Üye olun; tatil dönemi kampanyalarını ve otel etkinliklerini size
          e-postayla gönderelim.
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-10 rounded-sm border border-limestone/20 px-4 py-3"
          >
            Teşekkürler! Kampanya ve etkinlik duyurularını {email} adresine
            göndereceğiz.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="uyelik-eposta" className="sr-only">
              E-posta adresi
            </label>
            <input
              id="uyelik-eposta"
              type="email"
              required
              autoComplete="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-sm border border-limestone/25 bg-white/5 px-4 text-limestone outline-none placeholder:text-limestone/50 focus-visible:border-limestone/60 focus-visible:ring-3 focus-visible:ring-limestone/20"
            />
            <button
              type="submit"
              className="h-12 rounded-sm bg-bougainvillea px-6 font-medium text-white transition-colors hover:bg-bougainvillea/90 focus-visible:ring-3 focus-visible:ring-limestone/40 focus-visible:outline-none"
            >
              Üye ol
            </button>
          </form>
        )}

        <p className="mt-5 text-sm text-limestone/60">
          Üyelik, rezervasyonlarınızın doğrulanmasını da sağlar.
        </p>
      </div>
    </section>
  );
}

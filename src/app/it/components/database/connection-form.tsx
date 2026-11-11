"use client";

import { useState } from "react";
import { notConnected } from "@/src/app/it/lib/not-connected";
import {
  field,
  fieldHint,
  fieldLabel,
  secondaryButton,
  textAction,
} from "@/src/app/it/lib/ui";

type Connection = {
  name: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  tls: boolean;
};

const EMPTY: Connection = {
  name: "",
  host: "",
  port: "27017",
  database: "bilge_hotel",
  username: "",
  password: "",
  tls: false,
};

/**
 * Adds a database server, for when the data moves to another machine. The
 * server is only saved after its connection test passes.
 */
export function ConnectionForm() {
  const [values, setValues] = useState(EMPTY);
  const set = (patch: Partial<Connection>) =>
    setValues((current) => ({ ...current, ...patch }));
  const ready = values.name.trim() && values.host.trim() && values.port;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        notConnected("Adding a database server");
      }}
      className="flex flex-col gap-4 px-5 py-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={fieldLabel}>Name</span>
          <input
            value={values.name}
            onChange={(event) => set({ name: event.target.value })}
            placeholder="For example server-1"
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Host</span>
          <input
            value={values.host}
            onChange={(event) => set({ host: event.target.value })}
            placeholder="srv1.bilge.local or 10.0.0.2"
            className={field}
            spellCheck={false}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Port</span>
          <input
            inputMode="numeric"
            value={values.port}
            onChange={(event) =>
              set({ port: event.target.value.replace(/\D/g, "") })
            }
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={fieldLabel}>Database name</span>
          <input
            value={values.database}
            onChange={(event) => set({ database: event.target.value })}
            className={field}
            spellCheck={false}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>User name</span>
          <input
            value={values.username}
            onChange={(event) => set({ username: event.target.value })}
            autoComplete="off"
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Password</span>
          <input
            type="password"
            value={values.password}
            onChange={(event) => set({ password: event.target.value })}
            autoComplete="new-password"
            className={field}
          />
        </label>
      </div>

      <label className="flex items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={values.tls}
          onChange={(event) => set({ tls: event.target.checked })}
          className="mt-0.5 size-4 accent-[var(--secondary)]"
        />
        <span>
          <span className="block font-medium">
            Encrypt the connection (TLS)
          </span>
          <span className={fieldHint}>
            Needed when the server is outside the hotel network.
          </span>
        </span>
      </label>

      <div className="flex flex-wrap items-center justify-end gap-5">
        <button
          type="button"
          disabled={!ready}
          onClick={() => notConnected("Testing the connection")}
          className={`${textAction} disabled:opacity-50`}
        >
          Test connection
        </button>
        <button type="submit" disabled={!ready} className={secondaryButton}>
          Add server
        </button>
      </div>
    </form>
  );
}

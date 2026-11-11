"use client";

import { useState } from "react";
import { Switch } from "@components/ui/switch";
import { notConnected } from "@/src/app/it/lib/not-connected";
import type { BackupSchedule } from "@/src/app/it/lib/types";
import {
  field,
  fieldHint,
  fieldLabel,
  secondaryButton,
} from "@/src/app/it/lib/ui";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function ScheduleForm({ initial }: { initial: BackupSchedule }) {
  const [schedule, setSchedule] = useState(initial);
  const set = (patch: Partial<BackupSchedule>) =>
    setSchedule((current) => ({ ...current, ...patch }));
  const changed = JSON.stringify(schedule) !== JSON.stringify(initial);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        notConnected("Saving the backup schedule");
      }}
      className="flex flex-col gap-5 px-5 py-5"
    >
      <label className="flex items-center justify-between gap-4">
        <span>
          <span className={`block ${fieldLabel}`}>Scheduled backups</span>
          <span className={fieldHint}>
            {schedule.enabled
              ? "Backups run on their own at the time below."
              : "Off. Backups are only taken when you start one."}
          </span>
        </span>
        <Switch
          checked={schedule.enabled}
          onCheckedChange={(enabled) => set({ enabled })}
        />
      </label>

      <fieldset
        disabled={!schedule.enabled}
        className="grid gap-4 disabled:opacity-60 sm:grid-cols-2"
      >
        <legend className="sr-only">When to back up</legend>
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>How often</span>
          <select
            value={schedule.frequency}
            onChange={(event) =>
              set({
                frequency: event.target.value as BackupSchedule["frequency"],
              })
            }
            className={field}
          >
            <option value="daily">Every day</option>
            <option value="weekly">Once a week</option>
          </select>
        </label>

        {schedule.frequency === "weekly" && (
          <label className="flex flex-col gap-1.5">
            <span className={fieldLabel}>Day</span>
            <select
              value={schedule.weekday}
              onChange={(event) => set({ weekday: Number(event.target.value) })}
              className={field}
            >
              {WEEKDAYS.map((day, index) => (
                <option key={day} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Time</span>
          <input
            type="time"
            value={schedule.time}
            onChange={(event) => set({ time: event.target.value })}
            className={field}
          />
          <span className={fieldHint}>
            Pick a quiet hour; saving pauses for about 2 minutes.
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>Keep the last</span>
          <span className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={365}
              value={schedule.keepLast}
              onChange={(event) =>
                set({ keepLast: Number(event.target.value) })
              }
              className={`${field} w-24`}
            />
            <span className="text-sm">backups</span>
          </span>
          <span className={fieldHint}>
            Older ones are deleted on their own.
          </span>
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={fieldLabel}>Save backups to</span>
          <input
            value={schedule.destination}
            onChange={(event) => set({ destination: event.target.value })}
            className={field}
          />
          <span className={fieldHint}>
            A folder on a server, or a network share such as \\srv1\Backups.
          </span>
        </label>
      </fieldset>

      <div className="flex justify-end">
        <button type="submit" disabled={!changed} className={secondaryButton}>
          Save schedule
        </button>
      </div>
    </form>
  );
}

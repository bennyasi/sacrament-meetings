
"use client";

import { useActionState } from "react";
import {
  createMeeting,
  updateMeeting,
  type MeetingFormState,
} from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  meeting?: SacramentMeeting;
  mode?: "create" | "edit";
}

const initialState: MeetingFormState = {};

export default function MeetingForm({
  meeting,
  mode = "create",
}: MeetingFormProps) {
  const action = mode === "edit" ? updateMeeting : createMeeting;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  function fieldError(name: string) {
    const error = state.errors?.[name]?.[0];

    if (!error) return null;

    return (
      <p
        id={`${name}-error`}
        className="mt-1 text-sm text-red-700"
      >
        {error}
      </p>
    );
  }

  function field(
    name: string,
    label: string,
    value = "",
    required = false,
    type = "text"
  ) {
    const error = state.errors?.[name]?.[0];

    return (
      <div>
        <label
          htmlFor={name}
          className="mb-1 block font-medium text-slate-800"
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {fieldError(name)}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      {mode === "edit" && meeting && (
        <input type="hidden" name="id" value={meeting.id} />
      )}

      {state.message && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-lg bg-red-50 p-3 text-red-700"
        >
          {state.message}
        </p>
      )}

      <section>
        <h2 className="mb-4 text-xl font-bold">Meeting Information</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {field("date", "Meeting Date", meeting?.date, true, "date")}
          {field("title", "Meeting Title", meeting?.title || "Sacrament Meeting", true)}
          {field("theme", "Meeting Theme", meeting?.theme, true)}
          {field("time", "Meeting Time", meeting?.time || "10:00 AM", true)}
          {field("location", "Location", meeting?.location || "Main Chapel", true)}
          {field("ward", "Ward", meeting?.ward, true)}
          {field("branch", "Branch", meeting?.branch)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Meeting Leadership</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {field("presiding", "Presiding Officer", meeting?.presiding, true)}
          {field("conducting", "Conducting Officer", meeting?.conducting, true)}
          {field("chorister", "Chorister", meeting?.chorister)}
          {field("pianist", "Pianist", meeting?.pianist)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Hymns</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {field("openingHymn", "Opening Hymn", meeting?.openingHymn)}
          {field("sacramentHymn", "Sacrament Hymn", meeting?.sacramentHymn)}
          {field("closingHymn", "Closing Hymn", meeting?.closingHymn)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Prayers</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {field(
            "openingPrayer",
            "Opening Prayer",
            meeting?.agenda?.find(
              (item) => item.title === "Opening Prayer"
            )?.name
          )}

          {field(
            "closingPrayer",
            "Closing Prayer",
            meeting?.agenda?.find(
              (item) => item.title === "Closing Prayer"
            )?.name
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Speaker Information</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {field(
            "speakerName",
            "Speaker Name",
            meeting?.speakers?.[0]?.name
          )}

          {field(
            "speakerTopic",
            "Speaker Topic",
            meeting?.speakers?.[0]?.topic
          )}
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "Saving..."
          : mode === "edit"
            ? "Update Meeting"
            : "Create Meeting"}
      </button>
    </form>
  );
}

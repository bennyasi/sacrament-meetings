
"use client";

import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  reset,
}: MeetingsErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="max-w-lg rounded-xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Something Went Wrong
        </h1>

        <p className="mt-4 text-slate-600" aria-live="polite">
          We could not load the meetings. Please try again.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
          >
            Try Again
          </button>

          <Link
            href="/meetings"
            className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-100"
          >
            Back to Meetings
          </Link>
        </div>
      </div>
    </main>
  );
}

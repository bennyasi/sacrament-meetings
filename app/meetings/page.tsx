
import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="text-blue-700 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-slate-900">
          Sacrament Meetings
        </h1>

        <p className="mt-3 text-slate-600">
          View and organize upcoming sacrament meetings.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-slate-900">
                {meeting.title}
              </h2>

              <p className="mt-2 text-blue-700 font-medium">
                {meeting.theme}
              </p>

              <div className="mt-5 space-y-2 text-slate-600">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>

                <p>
                  <strong>Time:</strong> {meeting.time}
                </p>

                <p>
                  <strong>Location:</strong> {meeting.location}
                </p>
              </div>

              <Link
                href={`/meetings/${meeting.id}`}
                className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-700"
              >
                View Meeting Details
              </Link>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}


import Link from "next/link";
import { Suspense } from "react";
import { getMeetings } from "@/lib/meetings-db";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";

const MEETINGS_PER_PAGE = 5;

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query?.trim().toLowerCase() || "";
  const page = Math.max(1, Number(params.page) || 1);

  const meetings = await getMeetings();

  // Search meetings by type, theme, speaker, presiding, and conducting.
  const filteredMeetings = meetings.filter((meeting) => {
    const speakers =
      meeting.speakers?.flatMap((speaker) => [
        speaker.name,
        speaker.topic,
      ]) || [];

    const searchableText = [
      meeting.title,
      meeting.theme,
      meeting.speaker,
      meeting.presiding,
      meeting.conducting,
      ...speakers,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  // Pagination: display five meetings per page.
  const totalPages = Math.ceil(
    filteredMeetings.length / MEETINGS_PER_PAGE
  );

  const currentPage =
    totalPages === 0 ? 1 : Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * MEETINGS_PER_PAGE;

  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + MEETINGS_PER_PAGE
  );

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

        {/* Search meetings */}
        <div className="mt-8">
          <Suspense fallback={<p>Loading search...</p>}>
            <MeetingSearch />
          </Suspense>
        </div>

        <p className="mb-5 text-sm text-slate-600">
          Showing {paginatedMeetings.length} of{" "}
          {filteredMeetings.length} meetings.
        </p>

        {/* Meeting cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {paginatedMeetings.length > 0 ? (
            paginatedMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  {meeting.title}
                </h2>

                <p className="mt-2 font-medium text-blue-700">
                  {meeting.theme}
                </p>

                <div className="mt-5 space-y-2 text-slate-600">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      `${meeting.date}T00:00:00`
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
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
            ))
          ) : (
            <p className="rounded-xl bg-white p-8 text-center text-slate-600 md:col-span-2">
              No sacrament meetings available yet.
            </p>
          )}
        </div>

        {/* Pagination controls */}
        <Suspense fallback={null}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>

      </div>
    </main>
  );
}

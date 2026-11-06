
import PrintButton from "@/components/PrintButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";

export default async function MeetingDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meeting = getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/meetings"
          className="text-blue-700 hover:underline print:hidden"
        >
          ← Back to Meetings
        </Link>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

          <h1 className="text-3xl font-bold text-slate-900">
            {meeting.title}
          </h1>

          <p className="mt-3 text-blue-700">
            {meeting.theme}
          </p>

          <hr className="my-6" />

          <h2 className="mb-4 text-xl font-bold">
            Meeting Information
          </h2>

          <div className="space-y-3 text-slate-700">
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Time:</strong> {meeting.time}</p>
            <p><strong>Location:</strong> {meeting.location}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
          </div>

          <hr className="my-6" />

          <h2 className="mb-4 text-xl font-bold">
            Meeting Program
          </h2>

          <div className="space-y-3 text-slate-700">
            <p><strong>Opening Hymn:</strong> {meeting.openingHymn}</p>
            <p><strong>Sacrament Hymn:</strong> {meeting.sacramentHymn}</p>
            <p><strong>Speakers:</strong> {meeting.speaker}</p>
            <p><strong>Closing Hymn:</strong> {meeting.closingHymn}</p>
          </div>

          <PrintButton />

        </div>
      </div>
    </main>
  );
}

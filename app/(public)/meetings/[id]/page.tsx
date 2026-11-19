
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({ params }: Props) {
  const { id } = await params;

  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/meetings"
          className="text-blue-700 hover:underline"
        >
          ← Back to Meetings
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-slate-900">
          {meeting.title}
        </h1>

        <p className="mt-3 text-blue-700 font-medium">
          {meeting.theme}
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Meeting Information</h2>

          <div className="mt-4 space-y-3 text-slate-600">
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Time:</strong> {meeting.time}</p>
            <p><strong>Location:</strong> {meeting.location}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Hymns</h2>

          <div className="mt-4 space-y-3 text-slate-600">
            <p><strong>Opening Hymn:</strong> {meeting.openingHymn}</p>
            <p><strong>Sacrament Hymn:</strong> {meeting.sacramentHymn}</p>
            <p><strong>Closing Hymn:</strong> {meeting.closingHymn}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Speakers</h2>

          <div className="mt-4 space-y-4">
            {meeting.speakers.map((speaker, index) => (
              <div key={index}>
                <p className="font-semibold">{speaker.name}</p>
                <p className="text-slate-600">{speaker.topic}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Meeting Agenda</h2>

          <div className="mt-4 space-y-4">
            {meeting.agenda.map((item, index) => (
              <div key={index} className="border-b pb-3">
                <p className="font-semibold">{item.title}</p>
                <p className="text-slate-600">
                  {item.time} — {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

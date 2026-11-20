
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import DeleteMeetingButton from "@/components/delete-meeting-button";

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
          Back to Meetings
        </Link>

        <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {meeting.title}
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                {meeting.theme}
              </p>
            </div>

            <Link
              href={`/meetings/${meeting.id}/edit`}
              className="rounded-lg bg-blue-700 px-5 py-2 text-white hover:bg-blue-800"
            >
              Edit Meeting
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <h2 className="font-semibold">Date</h2>
              <p className="text-slate-600">{meeting.date}</p>
            </div>

            <div>
              <h2 className="font-semibold">Time</h2>
              <p className="text-slate-600">{meeting.time}</p>
            </div>

            <div>
              <h2 className="font-semibold">Location</h2>
              <p className="text-slate-600">{meeting.location}</p>
            </div>

            <div>
              <h2 className="font-semibold">Ward</h2>
              <p className="text-slate-600">{meeting.ward}</p>
            </div>

            <div>
              <h2 className="font-semibold">Branch</h2>
              <p className="text-slate-600">{meeting.branch || "Not specified"}</p>
            </div>

            <div>
              <h2 className="font-semibold">Presiding</h2>
              <p className="text-slate-600">{meeting.presiding}</p>
            </div>

            <div>
              <h2 className="font-semibold">Conducting</h2>
              <p className="text-slate-600">{meeting.conducting}</p>
            </div>

            <div>
              <h2 className="font-semibold">Chorister</h2>
              <p className="text-slate-600">{meeting.chorister || "Not specified"}</p>
            </div>

            <div>
              <h2 className="font-semibold">Pianist</h2>
              <p className="text-slate-600">{meeting.pianist || "Not specified"}</p>
            </div>
          </div>

          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold">Hymns</h2>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>Opening Hymn: {meeting.openingHymn || "Not specified"}</li>
              <li>Sacrament Hymn: {meeting.sacramentHymn || "Not specified"}</li>
              <li>Closing Hymn: {meeting.closingHymn || "Not specified"}</li>
            </ul>
          </section>

          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold">Speakers</h2>
            {meeting.speakers.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {meeting.speakers.map((speaker, index) => (
                  <li key={`${speaker.name}-${index}`}>
                    <p className="font-semibold">{speaker.name}</p>
                    <p className="text-slate-600">{speaker.topic}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-slate-600">No speakers listed.</p>
            )}
          </section>

          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold">Meeting Agenda</h2>
            <div className="mt-3 space-y-3">
              {meeting.agenda.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-slate-600">
                    {item.time} — {item.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold text-red-700">
              Delete Meeting
            </h2>
            <p className="my-3 text-slate-600">
              Delete this meeting from the database.
            </p>
            <DeleteMeetingButton meetingId={meeting.id} />
          </section>
        </div>
      </div>
    </main>
  );
}

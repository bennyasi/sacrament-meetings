import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/meeting-form";
import { getMeetingById } from "@/lib/meetings-db";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({ params }: Props) {
  const { id } = await params;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-700 hover:underline"
        >
          Back to Meeting
        </Link>

        <h1 className="mb-3 mt-6 text-3xl font-bold text-slate-900">
          Edit Meeting
        </h1>

        <p className="mb-8 text-slate-600">
          Update the details of this sacrament meeting.
        </p>

        <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <MeetingForm mode="edit" meeting={meeting} />
        </div>
      </div>
    </main>
  );
}

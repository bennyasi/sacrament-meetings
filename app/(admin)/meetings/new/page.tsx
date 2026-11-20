
import Link from "next/link";
import MeetingForm from "@/components/meeting-form";

export default function NewMeetingPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/meetings" className="text-blue-700 hover:underline">
          Back to Meetings
        </Link>

        <h1 className="mb-3 mt-6 text-3xl font-bold text-slate-900">
          Create New Meeting
        </h1>

        <p className="mb-8 text-slate-600">
          Enter the details for your sacrament meeting.
        </p>

        <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <MeetingForm mode="create" />
        </div>
      </div>
    </main>
  );
}

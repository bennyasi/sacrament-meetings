
import Link from "next/link";

const currentMeeting = {
  title: "Sunday Worship Service",
  date: "November 8, 2026",
  time: "10:00 AM",
  location: "Main Chapel",
  theme: "Faith in Jesus Christ",
  presiding: "Bishop",
  conducting: "Ward Leader",
  openingHymn: "The Spirit of God",
  sacramentHymn: "I Stand All Amazed",
  closingHymn: "God Be with You Till We Meet Again",
  speaker: "Ward Members",
};

export default function CurrentMeetingPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">

        <Link href="/meetings" className="text-blue-700 hover:underline">
          &larr; Back to Meetings
        </Link>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Current Sacrament Meeting
          </h1>

          <p className="mt-3 text-slate-600">
            {currentMeeting.theme}
          </p>

          <hr className="my-6" />

          <h2 className="mb-4 text-xl font-bold">
            Meeting Information
          </h2>

          <p className="mb-3"><strong>Title:</strong> {currentMeeting.title}</p>
          <p className="mb-3"><strong>Date:</strong> {currentMeeting.date}</p>
          <p className="mb-3"><strong>Time:</strong> {currentMeeting.time}</p>
          <p className="mb-3"><strong>Location:</strong> {currentMeeting.location}</p>
          <p className="mb-3"><strong>Presiding:</strong> {currentMeeting.presiding}</p>
          <p className="mb-3"><strong>Conducting:</strong> {currentMeeting.conducting}</p>

          <hr className="my-6" />

          <h2 className="mb-4 text-xl font-bold">
            Meeting Program
          </h2>

          <p className="mb-3"><strong>Opening Hymn:</strong> {currentMeeting.openingHymn}</p>
          <p className="mb-3"><strong>Sacrament Hymn:</strong> {currentMeeting.sacramentHymn}</p>
          <p className="mb-3"><strong>Speakers:</strong> {currentMeeting.speaker}</p>
          <p className="mb-3"><strong>Closing Hymn:</strong> {currentMeeting.closingHymn}</p>
        </div>
      </div>
    </main>
  );
}

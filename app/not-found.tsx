
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="max-w-lg rounded-xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Meeting Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          The meeting you are looking for does not exist or may have been removed.
        </p>

        <Link
          href="/meetings"
          className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
        >
          Return to Meetings
        </Link>
      </div>
    </main>
  );
}

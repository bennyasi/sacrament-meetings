
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-slate-900 px-6 py-24 text-center text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Welcome
        </p>

        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Sacrament Meeting Planner
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
          Plan, organize, and manage your sacrament meetings
          with ease. Create meaningful worship experiences
          through thoughtful preparation.
        </p>

        <Link
          href="/meetings"
          className="inline-block rounded-lg bg-amber-400 px-8 py-4 font-semibold text-slate-900 transition hover:bg-amber-300"
        >
          View Meetings
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            Plan Meetings
          </h2>
          <p className="text-slate-600">
            Organize meeting dates, themes, speakers, and
            other important details.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            Manage Programs
          </h2>
          <p className="text-slate-600">
            Keep meeting assignments and program details
            organized in one place.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            View Current Meeting
          </h2>
          <p className="text-slate-600">
            Quickly access the current sacrament meeting
            program and its details.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Sacrament Meeting Planner © 2026
      </footer>
    </main>
  );
}

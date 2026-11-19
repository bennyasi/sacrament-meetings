
export default function MeetingsLoading() {
  return (
    <main
      className="min-h-screen bg-stone-50 px-6 py-16"
      aria-busy="true"
      aria-label="Loading meetings"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 h-4 w-32 animate-pulse rounded bg-slate-200" />

        <div className="mb-3 h-10 w-64 animate-pulse rounded bg-slate-200" />

        <div className="mb-10 h-5 w-80 animate-pulse rounded bg-slate-200" />

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 h-7 w-48 animate-pulse rounded bg-slate-200" />
              <div className="mb-6 h-5 w-36 animate-pulse rounded bg-slate-200" />
              <div className="space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

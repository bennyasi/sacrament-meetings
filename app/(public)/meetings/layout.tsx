
import Link from "next/link";
import type { ReactNode } from "react";

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b bg-white">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4"
        >
          <Link href="/" className="font-semibold text-slate-900">
            Home
          </Link>

          <Link
            href="/meetings"
            className="text-slate-700 hover:text-blue-700"
          >
            Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="text-slate-700 hover:text-blue-700"
          >
            Current Meeting
          </Link>
        </nav>
      </header>

      {children}
    </>
  );
}

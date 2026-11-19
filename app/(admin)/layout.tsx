import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b bg-slate-900 text-white">
        <nav
          aria-label="Admin navigation"
          className="mx-auto flex max-w-5xl gap-6 px-6 py-4"
        >
          <Link href="/">Home</Link>
          <Link href="/meetings">Public Meetings</Link>
          <Link href="/meetings/new">Create Meeting</Link>
        </nav>
      </header>

      {children}
    </>
  );
}
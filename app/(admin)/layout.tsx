
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-6">
          <Link href="/" className="font-semibold text-blue-700">
            Home
          </Link>

          <Link href="/meetings" className="font-semibold text-blue-700">
            Public Meetings
          </Link>

          <Link href="/meetings/new" className="font-semibold text-blue-700">
            Create Meeting
          </Link>
        </div>
      </nav>

      {children}
    </>
  );
}

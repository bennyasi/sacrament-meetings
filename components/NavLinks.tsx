
import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="meeting-navigation">
      <Link href="/meetings">All Meetings</Link>
      <Link href="/meetings/current">Current Meeting</Link>
    </nav>
  );
}

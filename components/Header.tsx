
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo">
          Sacrament Planner
        </Link>

        <nav className="navigation">
          <Link href="/">Home</Link>
          <Link href="/meetings">Meetings</Link>
          <Link href="/meetings/current">Current Meeting</Link>
        </nav>
      </div>
    </header>
  );
}

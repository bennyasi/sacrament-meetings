
import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="meeting-card">
      <div className="meeting-card-content">
        <p className="meeting-date">
          {new Date(meeting.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>

        <h2>{meeting.ward}</h2>

        <p>{meeting.branch}</p>

        <div className="meeting-details">
          <p>
            <strong>Presiding:</strong> {meeting.presiding}
          </p>

          <p>
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="view-meeting-button"
        >
          View Meeting Details
        </Link>
      </div>
    </article>
  );
}

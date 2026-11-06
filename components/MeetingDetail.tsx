
import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <main className="meeting-program">
      <div className="program-header">
        <p className="program-label">SACRAMENT MEETING</p>
        <h1>{meeting.ward}</h1>
        <h2>{meeting.branch}</h2>
        <p>
          {new Date(meeting.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>

      <section className="meeting-leadership">
        <h2>Meeting Leadership</h2>
        <p><strong>Presiding:</strong> {meeting.presiding}</p>
        <p><strong>Conducting:</strong> {meeting.conducting}</p>
        <p><strong>Chorister:</strong> {meeting.chorister}</p>
        <p><strong>Pianist:</strong> {meeting.pianist}</p>
      </section>

      <section className="meeting-hymns">
        <h2>Hymns</h2>
        <p><strong>Opening Hymn:</strong> {meeting.openingHymn}</p>
        <p><strong>Sacrament Hymn:</strong> {meeting.sacramentHymn}</p>
        <p><strong>Closing Hymn:</strong> {meeting.closingHymn}</p>
      </section>

      <section className="meeting-agenda">
        <h2>Meeting Agenda</h2>

        {meeting.agenda.map((item, index) => (
          <div className="agenda-item" key={index}>
            <span>{item.time}</span>
            <span>{item.title}</span>
            {item.name && <span>{item.name}</span>}
          </div>
        ))}
      </section>

      <section className="meeting-speakers">
        <h2>Speakers</h2>

        {meeting.speakers.map((speaker, index) => (
          <div className="speaker-item" key={index}>
            <h3>{speaker.name}</h3>
            <p>{speaker.topic}</p>
          </div>
        ))}
      </section>

      <button
        className="print-button"
        onClick={() => window.print()}
      >
        Print Meeting Program
      </button>
    </main>
  );
}


import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

// ==========================================
// DATABASE CONNECTION
// ==========================================

function getDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.DATABASE_POSTGRES_URL,
    process.env.POSTGRES_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.DATABASE_POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL_NON_POOLING,
  ];

  const databaseUrl = candidates.find((value) => {
    if (!value) return false;

    try {
      const url = new URL(value);

      return (
        (url.protocol === "postgres:" ||
          url.protocol === "postgresql:") &&
        Boolean(url.hostname)
      );
    } catch {
      return false;
    }
  });

  if (!databaseUrl) {
    throw new Error(
      "No valid PostgreSQL URL found. Check your .env.local file."
    );
  }

  return databaseUrl;
}

const sql = neon(getDatabaseUrl());

// ==========================================
// DATABASE ROW TYPES
// ==========================================

interface DatabaseSpeaker {
  name?: string;
  topic?: string;
}

interface DatabaseHymn {
  title?: string;
}

interface DatabaseMeetingRow {
  id: string | number;
  date: string | Date;

  meeting_type?: string | null;
  theme?: string | null;
  time?: string | null;
  location?: string | null;
  ward?: string | null;
  branch?: string | null;

  presiding?: string | null;
  conducting?: string | null;
  chorister?: string | null;
  pianist?: string | null;

  announcements?: string[] | null;
  ward_business?: unknown;
  stake_business?: boolean | null;

  opening_hymn?: string | DatabaseHymn | null;
  sacrament_hymn?: string | DatabaseHymn | null;
  closing_hymn?: string | DatabaseHymn | null;

  opening_prayer?: string | null;
  closing_prayer?: string | null;

  speakers?: string | DatabaseSpeaker[] | null;
}

// ==========================================
// HYMN HELPER
// ==========================================

function getHymnTitle(
  hymn: DatabaseMeetingRow["opening_hymn"]
): string {
  if (!hymn) return "";

  if (typeof hymn === "string") {
    try {
      const parsed: unknown = JSON.parse(hymn);

      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "title" in parsed &&
        typeof parsed.title === "string"
      ) {
        return parsed.title;
      }

      return hymn;
    } catch {
      return hymn;
    }
  }

  return hymn.title ?? "";
}

// ==========================================
// SPEAKER HELPER
// ==========================================

function getSpeakers(
  speakers: DatabaseMeetingRow["speakers"]
): SacramentMeeting["speakers"] {
  if (!speakers) return [];

  let parsedSpeakers: unknown = speakers;

  if (typeof speakers === "string") {
    try {
      parsedSpeakers = JSON.parse(speakers);
    } catch {
      return speakers.trim()
        ? [{ name: speakers, topic: "" }]
        : [];
    }
  }

  if (!Array.isArray(parsedSpeakers)) {
    return [];
  }

  return parsedSpeakers.map(
    (speaker): SacramentMeeting["speakers"][number] => {
      if (typeof speaker === "string") {
        return {
          name: speaker,
          topic: "",
        };
      }

      const item = speaker as DatabaseSpeaker;

      return {
        name: item?.name ?? "",
        topic: item?.topic ?? "",
      };
    }
  );
}

// ==========================================
// MAP DATABASE ROW TO MEETING
// ==========================================

function mapMeeting(row: DatabaseMeetingRow): SacramentMeeting {
  const speakers = getSpeakers(row.speakers);

  return {
    id: String(row.id),

    date:
      row.date instanceof Date
        ? row.date.toISOString().split("T")[0]
        : String(row.date).split("T")[0],

    title: row.meeting_type ?? "Sacrament Meeting",
    theme: row.theme ?? "",
    time: row.time ?? "10:00 AM",
    location: row.location ?? "Main Chapel",
    ward: row.ward ?? "Main Ward",
    branch: row.branch ?? "",

    presiding: row.presiding ?? "",
    conducting: row.conducting ?? "",
    chorister: row.chorister ?? "",
    pianist: row.pianist ?? "",

    openingHymn: getHymnTitle(row.opening_hymn),
    sacramentHymn: getHymnTitle(row.sacrament_hymn),
    closingHymn: getHymnTitle(row.closing_hymn),

    speaker: speakers[0]?.name ?? "",
    speakers,

    agenda: [
      {
        time: "Opening",
        title: "Opening Prayer",
        name: row.opening_prayer ?? "",
      },
      {
        time: "Closing",
        title: "Closing Prayer",
        name: row.closing_prayer ?? "",
      },
    ],
  };
}

// ==========================================
// GET ALL MEETINGS
// ==========================================

export async function getMeetings(): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      date,
      meeting_type,
      theme,
      time,
      location,
      ward,
      branch,
      presiding,
      conducting,
      chorister,
      pianist,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    ORDER BY date DESC
  `;

  return (rows as unknown as DatabaseMeetingRow[]).map(mapMeeting);
}

// ==========================================
// GET MEETING BY ID
// ==========================================

export async function getMeetingById(
  id: string
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT
      id,
      date,
      meeting_type,
      theme,
      time,
      location,
      ward,
      branch,
      presiding,
      conducting,
      chorister,
      pianist,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return undefined;
  }

  return mapMeeting(rows[0] as unknown as DatabaseMeetingRow);
}

// ==========================================
// ADD NEW MEETING
// ==========================================

export async function addMeeting(
  meeting: SacramentMeeting
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      theme,
      time,
      location,
      ward,
      branch,
      presiding,
      conducting,
      chorister,
      pianist,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.title || "Sacrament Meeting"},
      ${meeting.theme || ""},
      ${meeting.time || "10:00 AM"},
      ${meeting.location || "Main Chapel"},
      ${meeting.ward || ""},
      ${meeting.branch || ""},
      ${meeting.presiding || ""},
      ${meeting.conducting || ""},
      ${meeting.chorister || ""},
      ${meeting.pianist || ""},
      ARRAY[]::text[],
      ${JSON.stringify({ title: meeting.openingHymn || "" })}::jsonb,
      ${
        meeting.agenda?.find(
          (item) => item.title === "Opening Prayer"
        )?.name || ""
      },
      ${JSON.stringify([])}::jsonb,
      ${false},
      ${JSON.stringify({ title: meeting.sacramentHymn || "" })}::jsonb,
      ${JSON.stringify(meeting.speakers || [])}::jsonb,
      ${JSON.stringify({ title: meeting.closingHymn || "" })}::jsonb,
      ${
        meeting.agenda?.find(
          (item) => item.title === "Closing Prayer"
        )?.name || ""
      }
    )
    RETURNING
      id,
      date,
      meeting_type,
      theme,
      time,
      location,
      ward,
      branch,
      presiding,
      conducting,
      chorister,
      pianist,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  if (rows.length === 0) {
    throw new Error("Meeting could not be created.");
  }

  return mapMeeting(rows[0] as unknown as DatabaseMeetingRow);
}

// ==========================================
// UPDATE MEETING
// ==========================================

export async function updateMeeting(
  id: string,
  meeting: SacramentMeeting
): Promise<SacramentMeeting> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      meeting_type = ${meeting.title || "Sacrament Meeting"},
      theme = ${meeting.theme || ""},
      time = ${meeting.time || "10:00 AM"},
      location = ${meeting.location || "Main Chapel"},
      ward = ${meeting.ward || ""},
      branch = ${meeting.branch || ""},
      presiding = ${meeting.presiding || ""},
      conducting = ${meeting.conducting || ""},
      chorister = ${meeting.chorister || ""},
      pianist = ${meeting.pianist || ""},
      opening_hymn = ${JSON.stringify({ title: meeting.openingHymn || "" })}::jsonb,
      opening_prayer = ${
        meeting.agenda?.find(
          (item) => item.title === "Opening Prayer"
        )?.name || ""
      },
      sacrament_hymn = ${JSON.stringify({ title: meeting.sacramentHymn || "" })}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers || [])}::jsonb,
      closing_hymn = ${JSON.stringify({ title: meeting.closingHymn || "" })}::jsonb,
      closing_prayer = ${
        meeting.agenda?.find(
          (item) => item.title === "Closing Prayer"
        )?.name || ""
      }
    WHERE id = ${id}
    RETURNING
      id,
      date,
      meeting_type,
      theme,
      time,
      location,
      ward,
      branch,
      presiding,
      conducting,
      chorister,
      pianist,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  if (rows.length === 0) {
    throw new Error("Meeting not found.");
  }

  return mapMeeting(rows[0] as unknown as DatabaseMeetingRow);
}

// ==========================================
// DELETE MEETING
// ==========================================

export async function deleteMeeting(id: string): Promise<void> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  if (rows.length === 0) {
    throw new Error("Meeting not found.");
  }
}

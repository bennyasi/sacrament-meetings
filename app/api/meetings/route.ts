
import { NextResponse } from "next/server";

const meetings = [
  {
    id: "1",
    title: "Sunday Worship Service",
    date: "2026-11-08",
    time: "10:00 AM",
    location: "Main Chapel",
    theme: "Faith in Jesus Christ",
  },
  {
    id: "2",
    title: "Sacrament Meeting",
    date: "2026-11-15",
    time: "10:00 AM",
    location: "Main Chapel",
    theme: "Following the Savior",
  },
];

export async function GET() {
  return NextResponse.json(meetings);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.date || !data.time) {
      return NextResponse.json(
        { message: "Title, date, and time are required." },
        { status: 400 }
      );
    }

    const newMeeting = {
      id: crypto.randomUUID(),
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location || "Main Chapel",
      theme: data.theme || "",
    };

    meetings.push(newMeeting);

    return NextResponse.json(newMeeting, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}

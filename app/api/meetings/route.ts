
import { NextResponse } from "next/server";
import {
  getMeetings,
  addMeeting,
} from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

// GET: Retrieve meetings from Neon PostgreSQL
export async function GET() {
  try {
    const meetings = await getMeetings();
    return NextResponse.json(meetings);
  } catch (error) {
    console.error("GET meetings error:", error);

    return NextResponse.json(
      { message: "Unable to retrieve meetings." },
      { status: 500 }
    );
  }
}

// POST: Save a new meeting to Neon PostgreSQL
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.date || !data.title) {
      return NextResponse.json(
        { message: "Meeting title and date are required." },
        { status: 400 }
      );
    }

    const newMeeting = await addMeeting(data);

    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.error("POST meeting error:", error);

    return NextResponse.json(
      { message: "Unable to save meeting." },
      { status: 500 }
    );
  }
}


import { NextResponse } from "next/server";
import { auth } from "@/auth";

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

type Context = {
  params: Promise<{ id: string }>;
};

// GET: Public access to a meeting.
export async function GET(
  _request: Request,
  { params }: Context
) {
  const { id } = await params;
  const meeting = meetings.find((item) => item.id === id);

  if (!meeting) {
    return NextResponse.json(
      { message: "Meeting not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}

// PUT: Authenticated users only.
export async function PUT(
  request: Request,
  { params }: Context
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const meeting = meetings.find((item) => item.id === id);

  if (!meeting) {
    return NextResponse.json(
      { message: "Meeting not found." },
      { status: 404 }
    );
  }

  try {
    const data = await request.json();

    Object.assign(meeting, {
      title: data.title ?? meeting.title,
      date: data.date ?? meeting.date,
      time: data.time ?? meeting.time,
      location: data.location ?? meeting.location,
      theme: data.theme ?? meeting.theme,
    });

    return NextResponse.json(meeting);
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}

// DELETE: Authenticated users only.
export async function DELETE(
  _request: Request,
  { params }: Context
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 }
    );
  }

  const { id } = await params;

  return NextResponse.json({
    message: `Delete operation requested for meeting ${id}.`,
  });
}

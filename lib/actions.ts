
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  addMeeting,
  updateMeeting as updateMeetingInDatabase,
  deleteMeeting as deleteMeetingFromDatabase,
} from "@/lib/meetings-db";

import type { SacramentMeeting } from "@/lib/types";

// ==========================================
// VALIDATION
// ==========================================

const meetingSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  title: z.string().min(1, "Meeting title is required."),
  theme: z.string().min(1, "Meeting theme is required."),
  time: z.string().min(1, "Meeting time is required."),
  location: z.string().min(1, "Meeting location is required."),
  ward: z.string().min(1, "Ward name is required."),
  branch: z.string(),
  presiding: z.string().min(1, "Presiding officer is required."),
  conducting: z.string().min(1, "Conducting officer is required."),
  chorister: z.string(),
  pianist: z.string(),
  openingHymn: z.string(),
  sacramentHymn: z.string(),
  closingHymn: z.string(),
  openingPrayer: z.string(),
  closingPrayer: z.string(),
  speakerName: z.string(),
  speakerTopic: z.string(),
});

export type MeetingFormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

function getFormValues(formData: FormData) {
  return {
    date: formData.get("date"),
    title: formData.get("title"),
    theme: formData.get("theme"),
    time: formData.get("time"),
    location: formData.get("location"),
    ward: formData.get("ward"),
    branch: formData.get("branch"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    chorister: formData.get("chorister"),
    pianist: formData.get("pianist"),
    openingHymn: formData.get("openingHymn"),
    sacramentHymn: formData.get("sacramentHymn"),
    closingHymn: formData.get("closingHymn"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    speakerName: formData.get("speakerName"),
    speakerTopic: formData.get("speakerTopic"),
  };
}

function createMeetingObject(
  data: z.infer<typeof meetingSchema>,
  id: string
): SacramentMeeting {
  const speakers = data.speakerName.trim()
    ? [
        {
          name: data.speakerName.trim(),
          topic: data.speakerTopic.trim(),
        },
      ]
    : [];

  return {
    id,
    date: data.date,
    title: data.title,
    theme: data.theme,
    time: data.time,
    location: data.location,
    ward: data.ward,
    branch: data.branch,
    presiding: data.presiding,
    conducting: data.conducting,
    chorister: data.chorister,
    pianist: data.pianist,
    openingHymn: data.openingHymn,
    sacramentHymn: data.sacramentHymn,
    closingHymn: data.closingHymn,
    speaker: speakers[0]?.name ?? "",
    speakers,
    agenda: [
      {
        time: "Opening",
        title: "Opening Prayer",
        name: data.openingPrayer,
      },
      {
        time: "Closing",
        title: "Closing Prayer",
        name: data.closingPrayer,
      },
    ],
  };
}

// ==========================================
// CREATE MEETING
// ==========================================

export async function createMeeting(
  _previousState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validatedFields = meetingSchema.safeParse(
    getFormValues(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const meeting = createMeetingObject(
    validatedFields.data,
    ""
  );

  try {
    await addMeeting(meeting);
  } catch (error) {
    console.error("Create meeting error:", error);

    return {
      message: "Unable to create the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// ==========================================
// UPDATE MEETING
// ==========================================

export async function updateMeeting(
  _previousState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const id = formData.get("id");

  if (typeof id !== "string" || !id.trim()) {
    return {
      message: "A valid meeting ID is required.",
    };
  }

  const validatedFields = meetingSchema.safeParse(
    getFormValues(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  const meeting = createMeetingObject(
    validatedFields.data,
    id
  );

  try {
    await updateMeetingInDatabase(id, meeting);
  } catch (error) {
    console.error("Update meeting error:", error);

    return {
      message: "Unable to update the meeting. Please try again.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect(`/meetings/${id}`);
}

// ==========================================
// DELETE MEETING
// ==========================================

export async function deleteMeeting(
  formData: FormData
): Promise<void> {
  const id = formData.get("id");

  if (typeof id !== "string" || !id.trim()) {
    throw new Error("A valid meeting ID is required.");
  }

  await deleteMeetingFromDatabase(id);

  revalidatePath("/meetings");
  redirect("/meetings");
}



import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingButtonProps {
  meetingId: string;
}

export default function DeleteMeetingButton({
  meetingId,
}: DeleteMeetingButtonProps) {
  return (
    <form action={deleteMeeting}>
      <input type="hidden" name="id" value={meetingId} />
      <button
        type="submit"
        className="rounded-lg bg-red-700 px-5 py-2 font-semibold text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete Meeting
      </button>
    </form>
  );
}

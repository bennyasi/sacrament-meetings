
export type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  theme: string;
  presiding: string;
  conducting: string;
  openingHymn: string;
  sacramentHymn: string;
  closingHymn: string;
  speaker: string;
};

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Sunday Worship Service",
    date: "2026-11-08",
    time: "10:00 AM",
    location: "Main Chapel",
    theme: "Faith in Jesus Christ",
    presiding: "Bishop",
    conducting: "Ward Leader",
    openingHymn: "The Spirit of God",
    sacramentHymn: "I Stand All Amazed",
    closingHymn: "God Be with You Till We Meet Again",
    speaker: "Ward Members",
  },
  {
    id: "2",
    title: "Sacrament Meeting",
    date: "2026-11-15",
    time: "10:00 AM",
    location: "Main Chapel",
    theme: "Following the Savior",
    presiding: "Bishop",
    conducting: "Ward Leader",
    openingHymn: "Come, Follow Me",
    sacramentHymn: "In Humility, Our Savior",
    closingHymn: "I Know That My Redeemer Lives",
    speaker: "Ward Members",
  },
];

export function getMeetings() {
  return meetings;
}

export function getMeetingById(id: string) {
  return meetings.find((meeting) => meeting.id === id);
}

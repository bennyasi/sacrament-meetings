
export interface SacramentMeeting {
  id: string;
  date: string;

  // Meeting information
  title: string;
  theme: string;
  time: string;
  location: string;
  ward: string;
  branch: string;

  // Meeting leadership
  presiding: string;
  conducting: string;
  chorister: string;
  pianist: string;

  // Hymns
  openingHymn: string;
  sacramentHymn: string;
  closingHymn: string;

  // Speakers
  speaker?: string;
  speakers: {
    name: string;
    topic: string;
  }[];

  // Meeting agenda
  agenda: {
    time: string;
    title: string;
    name: string;
  }[];
}

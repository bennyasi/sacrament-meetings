
export interface Speaker {
  name: string;
  topic: string;
}

export interface MeetingItem {
  time: string;
  title: string;
  name?: string;
}

export interface SacramentMeeting {
  id: string;
  date: string;
  ward: string;
  branch: string;
  presiding: string;
  conducting: string;
  chorister: string;
  pianist: string;
  openingHymn: string;
  sacramentHymn: string;
  closingHymn: string;
  speakers: Speaker[];
  agenda: MeetingItem[];
}

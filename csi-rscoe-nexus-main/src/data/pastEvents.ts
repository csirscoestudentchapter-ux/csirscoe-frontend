export interface PastEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string[];
  photos: string[];
  eventType: string;
  highlights?: string[];
  organizer?: string;
  duration?: string;
  prize?: string;
}

export const pastEventsData: PastEvent[] = [
  {
    id: 1,
    title: "OS And CN Workshop",
    description: "",
    date: "March 15, 2025",
    location: "Computer Department, RSCOE",
    participants: ["50+ Students from CS First Year"],
    photos: ["E1.1.jpg", "E1.2.jpg", "E1.3.jpg", "E1.4.jpg", "E1.5.jpg", "E1.6.jpg"],
    eventType: "Workshop",
    highlights: [
      "Computer Networks and Operating Systems"
    ],
    organizer: "CSI RSCOE Student Chapter",
    duration: "2 hours"
  },
  {
    id: 2,
    title: "Git and GitHub Session",
    description: "",
    date: "August 18, 2025",
    location: "Gmeet",
    participants: ["CSI Members"],
    photos: ["E2.1.png", "E2.2.png", "E2.3.png", "E2.4.png", "E2.5.png"],
    eventType: "Hands-on",
    highlights: [
      "Version Control Fundamentals"
    ],
    organizer: "CSI RSCOE Student Chapter",
    duration: "2 hours"
  },
  {
    id: 3,
    title: "First Year Induction Program",
    description: "",
    date: "September 10, 2025",
    location: "Main Auditorium, RSCOE",
    participants: ["First Year Students", "CSI Team"],
    photos: ["E3.1.jpg", "E3.2.jpg", "E3.3.jpg", "E3.4.jpg", "E3.5.jpg"],
    eventType: "Induction",
    highlights: [
      "Welcome New Students",
      "CSI Introduction",
      "Campus Orientation"
    ],
    organizer: "CSI RSCOE Student Chapter",
    duration: "1 hours"
  }
];

// Helper function to get events by type
export const getEventsByType = (type: string): PastEvent[] => {
  return pastEventsData.filter(event => event.eventType.toLowerCase() === type.toLowerCase());
};

// Helper function to get recent events
export const getRecentEvents = (limit: number = 3): PastEvent[] => {
  return pastEventsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

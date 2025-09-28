import { PastEvent } from '@/data/pastEvents';

/**
 * Helper function to add a new past event to the data
 * This makes it easier to add new events without manually editing the data file
 */
export const addPastEvent = (newEvent: Omit<PastEvent, 'id'>): PastEvent => {
  // Generate a new ID (in a real app, this would come from a database)
  const newId = Date.now();
  
  const event: PastEvent = {
    id: newId,
    ...newEvent
  };
  
  return event;
};

/**
 * Template for creating a new past event
 * Copy this template and fill in the details
 */
export const pastEventTemplate: Omit<PastEvent, 'id'> = {
  title: "Event Title",
  description: "Brief description of the event and what participants learned or achieved.",
  date: "Month Day, Year",
  location: "Venue Name, RSCoE",
  participants: ["Participant 1", "Participant 2", "X+ Students"],
  photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
  eventType: "Workshop", // Workshop, Competition, Symposium, Seminar, etc.
  highlights: [
    "Key highlight 1",
    "Key highlight 2", 
    "Key highlight 3"
  ],
  organizer: "CSI RSCoE Student Chapter",
  duration: "X hours",
  prize: "Prize description or 'Certificates of Participation'"
};

/**
 * Instructions for adding new past events:
 * 
 * 1. Add your event photos to the /public/uploads/ folder
 * 2. Open src/data/pastEvents.ts
 * 3. Add your new event to the pastEventsData array
 * 4. Use the template above as a guide for the structure
 * 5. Make sure photo filenames match exactly with what's in the uploads folder
 * 
 * Example:
 * {
 *   id: 4, // Use the next available ID
 *   title: "Your Event Title",
 *   description: "Your event description...",
 *   date: "April 1, 2024",
 *   location: "Your Venue",
 *   participants: ["List of participants"],
 *   photos: ["your-photo1.jpg", "your-photo2.jpg"],
 *   eventType: "Workshop",
 *   highlights: ["Highlight 1", "Highlight 2"],
 *   organizer: "Your Organization",
 *   duration: "4 hours",
 *   prize: "Your Prize"
 * }
 */

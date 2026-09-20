/**
 * Event data — single source of truth.
 *
 * To add or update an event, edit this array only. Nothing else needs to change.
 * `date` is the first day of the planned month (from the official Year Plan
 * 2026–2027, which gives month-level planning only — no exact dates).
 *
 * Do not add venues, speakers or descriptions that are not officially confirmed.
 * Leave `venue` / `speaker` undefined when unknown; the UI omits them.
 */

export type EventCategory =
  | "Guest Lecture"
  | "Workshop"
  | "Symposium"
  | "Webinar"
  | "Hackathon"
  | "Field Visit"
  | "Technical Quiz";

export type PesEvent = {
  slug: string;
  title: string;
  /** Month label exactly as given in the official Year Plan. */
  month: string;
  /** First day of the planned month, used only for ordering. */
  date: string;
  category: EventCategory;
  description: string;
  media?: {
    images?: string[];
    videos?: string[];
  };
  registrationOpen: boolean;
  registrationUrl?: string;
  venue?: string;
  speaker?: string;
  /** Poster/image URL when an official poster is available. */
  image?: string;
};

export const events: PesEvent[] = [
  {
    slug: "workshop-1",
    title: "Workshop 1",
    month: "19 September 2026",
    date: "2026-09-19",
    category: "Workshop",
    description: "Recent trends in industrial automation using PLC",
    registrationOpen: false,
    media: {
      images: [
        "/workshop1/09-19-2026 09_12_43 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_12_49 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_12_57 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_13_04 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_22_39 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_22_43 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_22_46 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_22_49 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_22_56 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg",
        "/workshop1/09-19-2026 09_40_22 AM_Perundurai, Erode, 638052, Tamil Nadu, India.jpg"
      ]
    }
  },
  {
    slug: "megawatt-2-o",
    title: "Megawatt 2.O",
    month: "26 September 2026",
    date: "2026-09-26",
    category: "Technical Quiz",
    description: "Megawatt 2.O",
    registrationOpen: true,
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfnkkZqMyc1G8UhxomAr-jO8b3CPd3ZqjbeQgbJR5jxT5zg_w/viewform",
    image: "/megawat.png",
  },
  {
    slug: "circuit-quest",
    title: "Circuit Quest",
    month: "28 October 2026",
    date: "2026-10-28",
    category: "Technical Quiz",
    description: "An exciting technical event focused on identifying and resolving circuit faults.",
    registrationOpen: true,
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSezhZx4P0jM8dZTU0n1j9Vf0BPKVUgQBmmaeEsYJJyNY8Kaag/viewform",
  },
  {
    slug: "inaugural-guest-lecture",
    title: "Inaugural & Guest Lecture",
    month: "To be announced",
    date: "2099-12-31", // Placeholder future date to force it into upcoming events
    category: "Guest Lecture",
    description:
      "Formal inauguration of the IEEE Power & Energy Society student chapter activities for 2026–27, followed by a guest lecture.",
    registrationOpen: false,
  },
  {
    slug: "spave2k26-inter-symposium",
    title: "SPAVE2K26 (Inter) – Symposium",
    month: "September 2026",
    date: "2026-09-27",
    category: "Symposium",
    description:
      "Inter-college technical symposium organised by the IEEE PES student chapter.",
    registrationOpen: false,
  },
  {
    slug: "webinar-gs",
    title: "Webinar (GS)",
    month: "October 2026",
    date: "2026-10-01",
    category: "Webinar",
    description: "Online session for student members conducted by the chapter.",
    registrationOpen: false,
  },
  {
    slug: "hackathon",
    title: "Hackathon",
    month: "November 2026",
    date: "2026-11-01",
    category: "Hackathon",
    description:
      "Team-based problem solving event on power and energy themes.",
    registrationOpen: false,
  },
  {
    slug: "guest-lecture",
    title: "Guest Lecture",
    month: "December 2026",
    date: "2026-12-01",
    category: "Guest Lecture",
    description: "Expert talk arranged for IEEE PES student members.",
    registrationOpen: false,
  },
  {
    slug: "field-visit",
    title: "Field Visit",
    month: "January 2027",
    date: "2027-01-01",
    category: "Field Visit",
    description:
      "Industrial/field exposure visit for student members of the chapter.",
    registrationOpen: false,
  },
  {
    slug: "spave2k26-intra-symposium",
    title: "SPAVE2K26 (Intra) – Symposium",
    month: "February 2027",
    date: "2027-02-01",
    category: "Symposium",
    description:
      "Intra-college technical symposium organised by the IEEE PES student chapter.",
    registrationOpen: false,
  },
  {
    slug: "workshop-ii",
    title: "Workshop II",
    month: "March 2027",
    date: "2027-03-01",
    category: "Workshop",
    description:
      "Second hands-on workshop of the academic year for student members.",
    registrationOpen: false,
  },
  {
    slug: "valedictory-guest-lecture",
    title: "Valedictory & Guest Lecture",
    month: "April 2027",
    date: "2027-04-01",
    category: "Guest Lecture",
    description:
      "Closing event of the 2026–27 chapter calendar with a guest lecture.",
    registrationOpen: false,
  },
];

const byDate = (a: PesEvent, b: PesEvent) => a.date.localeCompare(b.date);

function getTodayStr(now: Date): string {
  // Adjust to IST or handle timezone properly if needed.
  // Using simple ISO string for now based on local machine time.
  const dateObj = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return dateObj.toISOString().slice(0, 10);
}

export function getUpcomingEvents(now: Date = new Date()): PesEvent[] {
  const todayStr = getTodayStr(now);
  return events
    .filter((e) => e.date >= todayStr)
    .sort(byDate);
}

export function getPastEvents(now: Date = new Date()): PesEvent[] {
  const todayStr = getTodayStr(now);
  return events
    .filter((e) => e.date < todayStr)
    .sort(byDate)
    .reverse();
}

export function getEventBySlug(slug: string): PesEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getRegisterableEvents(now: Date = new Date()): PesEvent[] {
  return getUpcomingEvents(now).filter((e) => e.registrationOpen);
}

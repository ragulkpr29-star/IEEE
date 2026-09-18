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

export type EventStatus = "planned" | "past";

export type PesEvent = {
  slug: string;
  title: string;
  /** Month label exactly as given in the official Year Plan. */
  month: string;
  /** First day of the planned month, used only for ordering. */
  date: string;
  category: EventCategory;
  description: string;
  status: EventStatus;
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
    month: "21 September 2026",
    date: "2026-09-21",
    category: "Workshop",
    description: "Recent trends in industrial automation using PLC",
    status: "planned",
    registrationOpen: true,
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdLCDaQ0Gt6dmP1ASTfZ0MvEZG7odRbN0bEfPlLXPJfmvbhBQ/viewform?usp=header",
  },
  {
    slug: "megawatt-2-o",
    title: "Megawatt 2.O",
    month: "26 September 2026",
    date: "2026-09-26",
    category: "Technical Quiz",
    description: "Megawatt 2.O",
    status: "planned",
    registrationOpen: true,
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfnkkZqMyc1G8UhxomAr-jO8b3CPd3ZqjbeQgbJR5jxT5zg_w/viewform",
  },
  {
    slug: "inaugural-guest-lecture",
    title: "Inaugural & Guest Lecture",
    month: "July 2026",
    date: "2026-07-01",
    category: "Guest Lecture",
    description:
      "Formal inauguration of the IEEE Power & Energy Society student chapter activities for 2026–27, followed by a guest lecture.",
    status: "planned",
    registrationOpen: false,
  },
  {
    slug: "workshop-i",
    title: "Workshop I",
    month: "August 2026",
    date: "2026-08-01",
    category: "Workshop",
    description:
      "Hands-on workshop for student members on power and energy engineering practice.",
    status: "planned",
    registrationOpen: true,
  },
  {
    slug: "spave2k26-inter-symposium",
    title: "SPAVE2K26 (Inter) – Symposium",
    month: "September 2026",
    date: "2026-09-27",
    category: "Symposium",
    description:
      "Inter-college technical symposium organised by the IEEE PES student chapter.",
    status: "planned",
    registrationOpen: true,
  },
  {
    slug: "webinar-gs",
    title: "Webinar (GS)",
    month: "October 2026",
    date: "2026-10-01",
    category: "Webinar",
    description: "Online session for student members conducted by the chapter.",
    status: "planned",
    registrationOpen: true,
  },
  {
    slug: "hackathon",
    title: "Hackathon",
    month: "November 2026",
    date: "2026-11-01",
    category: "Hackathon",
    description:
      "Team-based problem solving event on power and energy themes.",
    status: "planned",
    registrationOpen: false,
  },
  {
    slug: "guest-lecture",
    title: "Guest Lecture",
    month: "December 2026",
    date: "2026-12-01",
    category: "Guest Lecture",
    description: "Expert talk arranged for IEEE PES student members.",
    status: "planned",
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
    status: "planned",
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
    status: "planned",
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
    status: "planned",
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
    status: "planned",
    registrationOpen: false,
  },
];

const byDate = (a: PesEvent, b: PesEvent) => a.date.localeCompare(b.date);

/** Planned events whose month has not yet ended. */
export function getUpcomingEvents(now: Date = new Date()): PesEvent[] {
  const cutoff = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  return events
    .filter((e) => e.status === "planned" && e.date >= cutoff)
    .sort(byDate);
}

/** Events with documented outcomes. Empty until the chapter adds records. */
export function getPastEvents(): PesEvent[] {
  return events.filter((e) => e.status === "past").sort(byDate).reverse();
}

export function getEventBySlug(slug: string): PesEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getRegisterableEvents(now?: Date): PesEvent[] {
  return getUpcomingEvents(now).filter((e) => e.registrationOpen);
}

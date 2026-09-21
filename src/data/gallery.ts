/**
 * Gallery images.
 *
 * Empty until official event photographs are supplied by the chapter.
 * Add entries like:
 *   { id: "spave-1", src: "/images/spave-1.jpg", alt: "...", category: "Symposiums", event: "SPAVE2K26" }
 */

export const galleryCategories = [
  "All",
  "Workshops",
  "Guest Lectures",
  "Symposiums",
  "Hackathons",
  "Field Visits",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
  event?: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "group-2026",
    src: "/groupimg.jpg",
    alt: "IEEE PES KEC Office Bearers 2026-27",
    category: "Symposiums",
    event: "Team 2026-27",
  },
];

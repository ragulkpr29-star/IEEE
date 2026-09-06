export type NavLink = {
  label: string;
  to: string;
};

/** The site has exactly these six sections. */
export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Office Bearers", to: "/office-bearers" },
  { label: "Registration", to: "/registration" },
  { label: "Contact", to: "/contact" },
];

export const org = {
  society: "IEEE Power & Energy Society",
  college: "Kongu Engineering College",
  collegeStatus: "(Autonomous)",
  address: "Perundurai, Erode – 638060",
  studentBranch: "IEEE Student Branch – 29741",
  tagline: "Powering Ideas. Engineering the Future.",
};

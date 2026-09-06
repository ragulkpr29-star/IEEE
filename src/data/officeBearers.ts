export type OfficeBearerRole =
  | "Chairman"
  | "Vice Chairman"
  | "Secretary"
  | "Treasurer"
  | "Joint Secretary"
  | "Additional Secretary"
  | "Joint Treasurer"
  | "Executive Heads"
  | "Event Management Team"
  | "Documentation & Reporting Lead"
  | "VTools Coordinator"
  | "Webmaster";

export type OfficeBearer = {
  name: string;
  rollNumber: string;
  role: OfficeBearerRole;
  image?: string;
};

export const officeBearers: OfficeBearer[] = [
  // CORE TEAM
  { name: "MONEESH S", rollNumber: "23EER057", role: "Chairman", image: "/MONEESH S 23EER057.jpg" },
  { name: "KULANDAISAMY R", rollNumber: "23EER041", role: "Vice Chairman", image: "/Kulandaisamy R.jpg" },
  { name: "KIRUTHIK P", rollNumber: "23EER038", role: "Secretary", image: "/Kiruthik P.jpg" },
  { name: "MANOLLASINI M J", rollNumber: "23EER049", role: "Secretary", image: "/MANOLLASINI M J 23EER049.jpg" },
  { name: "SUWASTHIKA V S", rollNumber: "23EER112", role: "Treasurer", image: "/SUWASTHIKA V S 23EER112.png" },
  { name: "NAVYASREE A S", rollNumber: "23EER068", role: "Treasurer", image: "/NAVYASREE A S 23EER068.png" },
  { name: "HARINI PRIYA G", rollNumber: "23EER023", role: "Joint Secretary", image: "/HARINI PRIYA G 23EER023.jpg" },
  { name: "MURUGAVELU M", rollNumber: "24EER074", role: "Joint Secretary", image: "/MURUGAVELU M 24EER074.png" },
  { name: "KAVIKSHA S", rollNumber: "24EER059", role: "Joint Secretary", image: "/kaviksha.jpg" },
  { name: "SHANMATHI M", rollNumber: "24EER110", role: "Additional Secretary", image: "/SHANMATHI M 24EER110.jpg" },
  { name: "MATHUSURYA K", rollNumber: "24EER071", role: "Additional Secretary", image: "/MATHUSURYA K 24EER071.jpg" },
  { name: "KATHIRVEL S", rollNumber: "24EER058", role: "Additional Secretary", image: "/KATHIRVEL S 24EER058.jpg" },
  { name: "DARSHAN G", rollNumber: "24EER021", role: "Joint Treasurer", image: "/DARSHAN G 24EER021.jpg" },
  { name: "DHAKKSHIN V M", rollNumber: "24EER024", role: "Joint Treasurer", image: "/DHAKKSHIN V M 24EER024.png" },

  // EXECUTIVE HEADS
  { name: "RAJAGANESH", rollNumber: "24EER089", role: "Executive Heads", image: "/RAJAGANESH A 24EER089.jpg" },
  { name: "HARJITH VINAY V S", rollNumber: "24EER044", role: "Executive Heads", image: "/HARJITH VINAY V S 24EER044.jpg" },
  { name: "PHRANIT KUMARAN D", rollNumber: "24EER084", role: "Executive Heads", image: "/PHRANIT KUMARAN D 24EER084.jpeg" },

  // EVENT MANAGEMENT TEAM
  { name: "GURU VISHAL A B", rollNumber: "24EER041", role: "Event Management Team", image: "/GURU VISHAL A B 24EER041.jpeg" },
  { name: "AMARNATH S", rollNumber: "24EER007", role: "Event Management Team", image: "/AMARNATH S 24EER007.JPG" },
  { name: "PRAKASH N", rollNumber: "24EER087", role: "Event Management Team", image: "/PRAKASH N 24EER087.jpg" },

  // DOCUMENTATION & REPORTING
  { name: "AJAYKUMAR P", rollNumber: "24EEL124", role: "Documentation & Reporting Lead", image: "/AJAYKUMAR ID PHOTO - AJAYKUMAR P 24EEL124.png" },
  { name: "MITHILESHWARAN M", rollNumber: "24EEL130", role: "Documentation & Reporting Lead", image: "/MITHILESHWARAN M 24EEL130.png" },
  { name: "SELVARAJKUMAR S M", rollNumber: "24EER108", role: "Documentation & Reporting Lead", image: "/SELVARAJKUMAR S M 24EER108.jpg" },

  // VTOOLS
  { name: "HARSHINI S", rollNumber: "24EER046", role: "VTools Coordinator", image: "/HARSINI S 24EER046.jpg" },
  { name: "DANUSRI S B", rollNumber: "24EER020", role: "VTools Coordinator", image: "/DANUSRI S B 24EER020.jpg" },
  { name: "RAMSUDHAN M", rollNumber: "24EER092", role: "VTools Coordinator", image: "/RAMSUDHAN M 24EER092.jpg" },

  // WEBMASTER
  { name: "VISHNUVARATHAN", rollNumber: "24EER122", role: "Webmaster", image: "/VISHNU VARTHANAN A S 24EER122.jpg" },
];

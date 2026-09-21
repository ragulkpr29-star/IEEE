import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { officeBearers, type OfficeBearerRole, type OfficeBearer } from "@/data/officeBearers";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/office-bearers")({
  component: OfficeBearers,
});

const roleHierarchy: OfficeBearerRole[] = [
  "Chairman",
  "Vice Chairman",
  "Secretary",
  "Treasurer",
  "Joint Secretary",
  "Additional Secretary",
  "Joint Treasurer",
  "Executive Heads",
  "Event Management Team",
  "Documentation & Reporting Lead",
  "VTools Coordinator",
  "Webmaster",
];

function MemberCard({ member, index }: { member: OfficeBearer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col md:flex-row bg-white border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[3px] mx-auto w-full max-w-[1100px]"
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kec/5 rounded-bl-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-kec-light/40 to-transparent pointer-events-none" />

      {/* Image Section */}
      <div className="flex-shrink-0 flex justify-center p-8 md:p-10 lg:pl-12 lg:py-12 border-b md:border-b-0 md:border-r border-border/40 bg-slate-50/50 relative">
        <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full p-1.5 border-[2px] border-kec/20 relative group-hover:border-kec/50 transition-colors duration-300">
          <div className="w-full h-full rounded-full overflow-hidden bg-background">
            {member.image ? (
              <img
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                loading="lazy"
                width={240}
                height={240}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-4xl text-navy/20 uppercase font-bold bg-navy/5">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-10">
        <div className="w-12 h-1 bg-kec mb-6 rounded-full" />

        <h3 className="font-display text-2xl md:text-[34px] font-bold text-navy uppercase leading-tight mb-2 tracking-tight">
          {member.name}
        </h3>

        <p className="font-sans text-base md:text-[18px] font-bold uppercase tracking-[0.15em] text-kec mb-8">
          {member.role}
        </p>

        <div className="mt-auto inline-flex items-center gap-2 bg-slate-100/80 px-5 py-2.5 rounded-full border border-slate-200">
          <GraduationCap className="w-5 h-5 text-navy/70" />
          <span className="font-sans text-sm md:text-[17px] font-semibold text-navy tracking-widest">
            {member.rollNumber}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CompactMemberCard({ member, index }: { member: OfficeBearer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col items-center bg-white border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-[3px] w-full max-w-[540px] mx-auto text-center"
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-kec/5 rounded-bl-[80px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kec-light/40 to-transparent pointer-events-none" />

      {/* Image Section */}
      <div className="pt-10 pb-6 relative z-10 w-full flex justify-center bg-slate-50/30 border-b border-border/30">
        <div className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] rounded-full p-1.5 border-[2px] border-kec/20 relative group-hover:border-kec/50 transition-colors duration-300">
          <div className="w-full h-full rounded-full overflow-hidden bg-background">
            {member.image ? (
              <img
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                loading="lazy"
                width={170}
                height={170}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-4xl text-navy/20 uppercase font-bold bg-navy/5">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-8 flex flex-col items-center relative z-10 w-full flex-1">
        <div className="w-10 h-1 bg-kec mb-5 rounded-full" />

        <h3 className="font-display text-xl sm:text-2xl font-bold text-navy uppercase leading-tight mb-2 tracking-tight">
          {member.name}
        </h3>

        <p className="font-sans text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-kec mb-6">
          {member.role}
        </p>

        <div className="mt-auto inline-flex items-center gap-2 bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200">
          <GraduationCap className="w-4 h-4 text-navy/70" />
          <span className="font-sans text-xs sm:text-sm font-semibold text-navy tracking-widest">
            {member.rollNumber}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function OfficeBearers() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute inset-0 grid-faint" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-kec-light mb-4">
              Team 2026–2027
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              OFFICE BEARERS
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto font-light">
              The student leadership driving innovation and technical excellence at IEEE PES Kongu
              Engineering College.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F7F9F8] py-16 sm:py-24 min-h-[50vh]">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-24">
            {roleHierarchy.map((role) => {
              const members = officeBearers.filter((m) => m.role === role);

              if (members.length === 0) return null;

              const isTopLeadership = role === "Chairman" || role === "Vice Chairman";

              return (
                <div key={role} className="flex flex-col w-full">
                  {/* Role Heading */}
                  <div className="mb-8 sm:mb-10 flex flex-col items-center">
                    <h2 className="font-display text-2xl md:text-[28px] font-bold text-navy uppercase mb-3 tracking-widest text-center">
                      {role}
                    </h2>
                    <div className="w-12 h-1 bg-kec rounded-full" />
                  </div>

                  {/* Members List */}
                  {isTopLeadership ? (
                    <div className="w-full flex flex-col gap-8 sm:gap-10 items-center">
                      {members.map((member, i) => (
                        <MemberCard
                          key={`${member.rollNumber}-${member.role}`}
                          member={member}
                          index={i}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {members.map((member, i) => (
                        <CompactMemberCard
                          key={`${member.rollNumber}-${member.role}`}
                          member={member}
                          index={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

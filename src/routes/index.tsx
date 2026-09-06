import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getUpcomingEvents } from "@/data/events";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

function Index() {
  const upcoming = getUpcomingEvents().slice(0, 3);

  return (
    <SiteLayout>
      {/* ================================================== */}
      {/* HERO SECTION (Dark Navy)                           */}
      {/* ================================================== */}
      <section className="relative w-full bg-navy text-white overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Subtle Engineering Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute inset-0 grid-faint" />
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
            className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-kec/20 to-transparent blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text Composition */}
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-2xl relative z-10">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-kec-light text-xs font-bold uppercase tracking-[0.2em] mb-8">
                <span className="w-6 h-px bg-kec-light" /> IEEE STUDENT BRANCH · 29741
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-display font-bold tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
                IEEE POWER &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">ENERGY SOCIETY</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="mt-6 font-display font-bold tracking-widest text-kec-light text-sm sm:text-base uppercase">
                KONGU ENGINEERING COLLEGE
              </motion.p>
              
              <motion.p variants={fadeInUp} className="mt-8 text-lg sm:text-xl font-sans font-light text-white/70 max-w-lg leading-relaxed border-l-2 border-white/20 pl-4">
                Powering Ideas.<br />
                Engineering the Future.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap gap-4 sm:gap-6">
                <Link
                  to="/events"
                  className="group relative inline-flex items-center gap-3 bg-ieee px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white overflow-hidden transition-all hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-3">
                    EXPLORE EVENTS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
                <Link
                  to="/registration"
                  className="group inline-flex items-center gap-3 border border-white/20 bg-transparent px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-kec-light hover:text-kec-light"
                >
                  JOIN IEEE PES
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Premium Image Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:ml-auto w-full max-w-lg"
            >
              {/* Architectural Frame */}
              <div className="relative w-full bg-navy-light border border-white/10 p-2 sm:p-4">
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-kec-light -mt-2 -mr-2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-ieee -mb-2 -ml-2" />
                
                <img
                  src="/groupimg.jpg"
                  alt="IEEE PES KEC Members"
                  className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* ABOUT SECTION (Off-White)                          */}
      {/* ================================================== */}
      <section className="bg-background py-20 sm:py-32 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow flex items-center gap-4 mb-4">
                <span className="w-8 h-px bg-kec" /> About
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy leading-[1.2] mb-6">
                POWERING THE NEXT GENERATION OF ENERGY ENGINEERS
              </h2>
              <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
                The IEEE Power & Energy Society at Kongu Engineering College provides students with opportunities for technical learning, workshops, lectures, symposiums, hackathons, field exposure and professional development in the power and energy domain.
              </p>
            </motion.div>

            {/* Right: Small Technical Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="bg-surface p-6 border border-border shadow-sm flex flex-col gap-2">
                <span className="font-display font-bold text-3xl text-ieee">29741</span>
                <span className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground">IEEE Student Branch</span>
              </div>
              <div className="bg-surface p-6 border border-border shadow-sm flex flex-col gap-2">
                <span className="font-display font-bold text-3xl text-navy">2026–27</span>
                <span className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground">Office Bearers</span>
              </div>
              <div className="bg-surface p-6 border border-border shadow-sm flex flex-col gap-2 sm:col-span-2">
                <span className="font-display font-bold text-3xl text-kec">10</span>
                <span className="font-sans text-xs font-bold tracking-widest uppercase text-muted-foreground">Planned Activities</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* UPCOMING EVENTS SECTION (White)                    */}
      {/* ================================================== */}
      <section className="bg-surface py-20 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          >
            <div>
              <p className="eyebrow flex items-center gap-4 mb-2">
                <span className="w-2 h-2 bg-kec" /> Year Plan 2026–2027
              </p>
              <h2 className="section-title text-3xl sm:text-4xl">Upcoming Events</h2>
            </div>
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-navy transition-colors hover:text-ieee"
            >
              <span className="border-b border-navy/30 group-hover:border-ieee pb-1 transition-colors">View All Events</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {upcoming.length > 0 ? (
              upcoming.map((event, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={event.slug} 
                  className="group bg-background border border-border hover:border-ieee/30 transition-colors duration-300 p-8 flex flex-col"
                >
                  <p className="font-sans text-xs font-bold text-kec uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {event.month}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-1 bg-navy/5 text-navy uppercase tracking-widest self-start mb-4">
                    {event.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-navy mb-4 leading-tight group-hover:text-ieee transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground line-clamp-3 mb-8 flex-grow">
                    {event.description}
                  </p>
                  <Link
                    to={`/events/$slug`}
                    params={{ slug: event.slug }}
                    className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-navy hover:text-ieee transition-colors mt-auto w-max"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-border bg-background">
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">No upcoming events at this time.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

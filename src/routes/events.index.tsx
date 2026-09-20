import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getUpcomingEvents, getPastEvents, type PesEvent } from "@/data/events";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/")({
  component: EventsIndex,
});

function EventCard({ event, index }: { event: PesEvent; index: number }) {
  const dateObj = new Date();
  const todayStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const isPast = event.date < todayStr;
  const isRegistrationOpen = event.registrationOpen && !isPast;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "group relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-surface border transition-all duration-300",
        isPast
          ? "border-border/50 opacity-80"
          : isRegistrationOpen
            ? "border-kec/30 shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5 overflow-hidden"
            : "border-border/60 hover:border-border"
      )}
    >
      {isRegistrationOpen && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-kec opacity-90" />
      )}

      <div className={cn("flex flex-col sm:w-1/4 shrink-0 border-l pl-4 py-1 self-start relative z-10", isRegistrationOpen ? "border-kec border-l-2" : "border-border")}>
        <p className="font-sans text-xs font-bold text-navy uppercase tracking-widest flex items-center gap-2">
          <Calendar className={cn("w-3.5 h-3.5", isRegistrationOpen ? "text-kec" : "text-muted-foreground")} />
          {event.month}
        </p>

        {isRegistrationOpen ? (
          <p className="text-[10px] font-bold uppercase tracking-widest mt-3 w-max px-2.5 py-1.5 bg-kec/10 text-kec border border-kec/20">
            Registration Open
          </p>
        ) : (
          <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-3 w-max px-2 py-1", isPast ? "bg-slate-100 text-slate-500" : "bg-navy/5 text-ieee")}>
            {isPast ? "Completed" : "Planned"}
          </p>
        )}
      </div>

      <div className="flex flex-col flex-1 relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[10px] font-bold px-2 py-1 bg-navy text-white uppercase tracking-widest">
            {event.category}
          </span>
          {event.venue && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {event.venue}
            </span>
          )}
        </div>

        <h3 className={cn("font-display text-2xl font-bold mb-3 transition-colors", isRegistrationOpen ? "text-navy group-hover:text-ieee" : "text-navy")}>
          {event.title}
        </h3>

        <p className={cn("font-sans text-sm text-muted-foreground leading-relaxed", isRegistrationOpen ? "mb-6" : "")}>
          {event.description}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-auto pt-2">
          {isRegistrationOpen && event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ieee text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-navy transition-all group/btn"
            >
              Register Now
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
            </a>
          )}
          {isPast && (
            <Link
              to="/events/$slug"
              params={{ slug: event.slug }}
              hash="event-gallery"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-kec hover:text-ieee transition-colors w-max"
            >
              VIEW EVENT PHOTOS &rarr;
            </Link>
          )}
          {!isPast && isRegistrationOpen && (
            <Link
              to="/events/$slug"
              params={{ slug: event.slug }}
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-navy hover:text-ieee transition-colors w-max"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EventsIndex() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  const [search, setSearch] = useState("");
  const filterEvents = (events: PesEvent[]) =>
    events.filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase())
    );

  const filteredUpcoming = filterEvents(upcoming);
  const filteredPast = filterEvents(past);

  const registrationOpenEvents = filteredUpcoming.filter((e) => e.registrationOpen);
  const otherUpcomingEvents = filteredUpcoming.filter((e) => !e.registrationOpen);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute inset-0 grid-faint" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-kec-light mb-4">
              Year Plan 2026–2027
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              EVENTS
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto font-light">
              Engineering knowledge beyond the classroom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16 sm:py-24 min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Search Bar */}
          <div className="mb-16 relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted" />
            </div>
            <input
              type="text"
              placeholder="Search events or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border border-border bg-surface text-foreground font-sans text-sm focus:ring-1 focus:ring-kec focus:border-kec transition-colors placeholder:text-muted"
            />
          </div>

          <div className="space-y-20">
            {/* Registration Open Section */}
            {registrationOpenEvents.length > 0 && (
              <div>
                <h2 className="eyebrow flex items-center gap-4 mb-8">
                  <span className="w-8 h-px bg-kec" /> REGISTRATION OPEN
                </h2>

                <div className="space-y-6">
                  {registrationOpenEvents.map((event, i) => (
                    <EventCard key={event.slug} event={event} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div>
              <h2 className="eyebrow flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-kec" /> UPCOMING EVENTS
              </h2>

              {otherUpcomingEvents.length > 0 ? (
                <div className="space-y-6">
                  {otherUpcomingEvents.map((event, i) => (
                    <EventCard key={event.slug} event={event} index={i} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border border-border bg-surface">
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                    No other upcoming events found.
                  </p>
                </div>
              )}
            </div>

            {/* Past Events */}
            <div>
              <h2 className="eyebrow flex items-center gap-4 mb-8 text-muted">
                <span className="w-8 h-px bg-muted" /> PAST
              </h2>

              {filteredPast.length > 0 ? (
                <div className="space-y-6">
                  {filteredPast.map((event, i) => (
                    <EventCard key={event.slug} event={event} index={i} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border border-border bg-surface opacity-80">
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                    No past events recorded yet.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </SiteLayout>
  );
}

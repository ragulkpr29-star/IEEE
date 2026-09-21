import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { events, type PesEvent } from "@/data/events";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/")({
  component: EventsIndex,
});

function EventCard({ event, index }: { event: PesEvent; index: number }) {
  const dateObj = new Date();
  const todayStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  const isPast = event.date < todayStr;
  const isRegistrationOpen = event.registrationOpen && !isPast;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "group relative flex flex-col h-full gap-6 p-6 sm:p-8 bg-surface border rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-kec/40",
        isPast ? "border-border/50 opacity-80 hover:opacity-100" : "border-border",
      )}
    >
      {isRegistrationOpen && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-kec opacity-90" />
      )}

      <div
        className={cn(
          "flex flex-col shrink-0 border-l pl-4 py-1 self-start relative z-10",
          isRegistrationOpen ? "border-kec border-l-2" : "border-border",
        )}
      >
        <p className="font-sans text-xs font-bold text-navy uppercase tracking-widest flex items-center gap-2">
          <Calendar
            className={cn("w-3.5 h-3.5", isRegistrationOpen ? "text-kec" : "text-muted-foreground")}
          />
          {event.month}
        </p>

        {isRegistrationOpen ? (
          <p className="text-[10px] font-bold uppercase tracking-widest mt-3 w-max px-2.5 py-1.5 bg-kec/10 text-kec border border-kec/20">
            Registration Open
          </p>
        ) : (
          <p
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest mt-3 w-max px-2 py-1",
              isPast ? "bg-slate-100 text-slate-500" : "bg-navy/5 text-ieee",
            )}
          >
            {isPast ? "Completed" : "Upcoming"}
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

        <h3
          className={cn(
            "font-display text-2xl font-bold mb-3 transition-colors",
            isRegistrationOpen ? "text-navy group-hover:text-ieee" : "text-navy",
          )}
        >
          {event.title}
        </h3>

        <p
          className={cn(
            "font-sans text-sm text-muted-foreground leading-relaxed",
            isRegistrationOpen ? "mb-6" : "",
          )}
        >
          {event.description}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-auto pt-6">
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
  const dateObj = new Date();
  const todayStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Ongoing" | "Past">("All");

  const filterEventsByStatus = (e: PesEvent) => {
    const isForceOngoing = e.slug === "megawatt-2-o" || e.slug === "circuit-quest";

    if (filter === "All") return true;
    if (filter === "Ongoing") return e.date === todayStr || isForceOngoing;
    if (filter === "Upcoming") return e.date > todayStr && !isForceOngoing;
    if (filter === "Past") return e.date < todayStr && !isForceOngoing;
    return true;
  };

  const filteredEvents = events
    .filter(filterEventsByStatus)
    .filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase()),
    );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (filter === "Past") {
      return b.date.localeCompare(a.date);
    }
    if (filter === "All") {
      const aIsPast = a.date < todayStr;
      const bIsPast = b.date < todayStr;
      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;
      if (aIsPast && bIsPast) return b.date.localeCompare(a.date);
      return a.date.localeCompare(b.date);
    }
    return a.date.localeCompare(b.date);
  });

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
          <div className="mb-12 relative max-w-md mx-auto">
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

          <div className="max-w-7xl mx-auto space-y-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {(["All", "Upcoming", "Ongoing", "Past"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "px-6 py-2.5 rounded-full font-sans text-sm font-bold uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-kec focus-visible:ring-offset-2",
                    filter === f
                      ? "bg-kec text-white shadow-md border border-kec"
                      : "bg-surface text-foreground border border-kec hover:bg-kec/10",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Event List */}
            {sortedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event, i) => (
                  <EventCard key={event.slug} event={event} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border border-border bg-surface opacity-80 rounded-lg">
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                  {filter === "Upcoming" && "No upcoming events at the moment."}
                  {filter === "Ongoing" && "No ongoing events at the moment."}
                  {filter === "Past" && "No past events available."}
                  {filter === "All" && "No events found."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

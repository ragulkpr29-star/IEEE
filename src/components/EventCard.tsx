import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { PesEvent } from "@/data/events";

function PosterArea({ event }: { event: PesEvent }) {
  if (event.image) {
    return (
      <img
        src={event.image}
        alt={`${event.title} poster`}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover"
      />
    );
  }
  return (
    <div className="grid-faint flex aspect-[16/9] w-full items-center justify-center border-b border-border bg-surface">
      <div className="text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ieee/70">
          {event.category}
        </p>
        <p className="mt-1 text-[0.7rem] text-muted-foreground">
          Poster to be announced
        </p>
      </div>
    </div>
  );
}

export function EventCard({ event }: { event: PesEvent }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <PosterArea event={event} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-secondary-foreground">
            {event.category}
          </span>
          {event.status === "planned" ? (
            <span className="rounded-full border border-kec/40 bg-accent px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-kec-foreground">
              Planned
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy">
          {event.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-ieee">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {event.month}
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            to="/events/$slug"
            params={{ slug: event.slug }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:border-ieee/40 hover:bg-secondary"
          >
            View Details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

        </div>
      </div>
    </article>
  );
}

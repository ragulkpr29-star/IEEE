import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Share2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEventBySlug } from "@/data/events";
import { motion } from "framer-motion";
import { useState } from "react";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export const Route = createFileRoute("/events/$slug")({
  component: EventDetails,
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  },
});

function EventDetails() {
  const event = Route.useLoaderData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dateObj = new Date();
  const todayStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  const isPast = event.date < todayStr;

  return (
    <SiteLayout>
      <div className="bg-background min-h-screen pb-24">
        {/* Top Header / Breadcrumb */}
        <div className="bg-navy border-b border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-[10px] font-bold px-3 py-1.5 bg-ieee text-white uppercase tracking-widest">
                {event.category}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 ${isPast ? "bg-slate-200 text-slate-600" : "bg-kec/20 text-kec"}`}
              >
                {isPast ? "Completed" : "Planned"}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight mb-8 leading-[1.1]">
              {event.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 py-6 border-y border-border mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-border shrink-0">
                  <Calendar className="w-4 h-4 text-ieee" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
                    Date
                  </p>
                  <p className="font-sans font-medium text-foreground">{event.month}</p>
                </div>
              </div>

              {event.venue && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-border shrink-0">
                    <MapPin className="w-4 h-4 text-kec" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
                      Venue
                    </p>
                    <p className="font-sans font-medium text-foreground">{event.venue}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {event.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 max-w-2xl"
            >
              <img
                src={event.image}
                alt={`${event.title} Poster`}
                className="w-full h-auto object-contain rounded-xl border border-border shadow-md"
              />
            </motion.div>
          )}

          {!isPast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="eyebrow flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-kec" /> About Event
              </h2>

              <div className="prose prose-lg prose-slate max-w-none font-sans text-muted-foreground leading-relaxed">
                <p>{event.description}</p>
              </div>

              {event.registrationUrl && event.registrationOpen && (
                <div className="mt-12">
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ieee text-white font-sans text-sm font-bold uppercase tracking-widest hover:bg-navy transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {isPast && event.media && event.media.images && event.media.images.length > 0 && (
            <motion.div
              id="event-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 pt-16 border-t border-border scroll-mt-24"
            >
              <h2 className="eyebrow flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-kec" /> EVENT PHOTOS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {event.media.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="aspect-video bg-surface border border-border rounded-xl overflow-hidden relative group w-full text-left"
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${event.title} photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {isPast && event.media?.images && (
        <GalleryLightbox
          images={event.media.images.map((img) => ({ src: img, alt: event.title }))}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </SiteLayout>
  );
}

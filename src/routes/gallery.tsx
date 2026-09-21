import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { galleryImages, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Maximize2, X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter);

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
              Visual Archive
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              GALLERY
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto font-light">
              Moments from our symposiums, workshops, and technical visits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16 sm:py-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-all",
                  filter === cat
                    ? "bg-navy text-white shadow-sm"
                    : "bg-surface text-muted-foreground border border-border hover:border-ieee hover:text-navy",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          {filteredImages.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredImages.map((img) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={img.id}
                    className="group relative bg-surface border border-border overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(img.src)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                      <Maximize2 className="text-white w-8 h-8 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0" />
                      <p className="text-white font-sans text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 translate-y-4 group-hover:translate-y-0">
                        {img.alt}
                      </p>
                      {img.event && (
                        <p className="text-kec-light font-sans text-xs font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                          {img.event}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-24 text-center border border-border bg-surface">
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                No photos available in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
              <span className="sr-only">Close</span>
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

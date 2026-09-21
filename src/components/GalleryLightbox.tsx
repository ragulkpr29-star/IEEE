import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { GalleryImage } from "@/data/gallery";

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function GalleryLightbox({ images, index, onClose, onChange }: Props) {
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, go]);

  if (!open) return null;
  const image = images[index];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 animate-in fade-in duration-200"
    >
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-navy shadow-card"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous image"
        className="absolute left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-navy shadow-card sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next image"
        className="absolute right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-navy shadow-card sm:right-6"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <figure className="relative z-[5] max-h-full w-full max-w-4xl overflow-hidden rounded-xl bg-background shadow-card-hover animate-in zoom-in-95 duration-200">
        <img src={image.src} alt={image.alt} className="max-h-[70vh] w-full object-contain" />
        <figcaption className="border-t border-border px-5 py-3 text-sm text-muted-foreground">
          {image.event ? <span className="font-semibold text-navy">{image.event} · </span> : null}
          {image.alt}
        </figcaption>
      </figure>
    </div>
  );
}

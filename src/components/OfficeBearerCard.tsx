import { User } from "lucide-react";
import type { Bearer } from "@/data/officeBearers";
import { cn } from "@/lib/utils";

type Props = {
  bearer: Bearer;
  position: string;
  featured?: boolean;
};

export function OfficeBearerCard({ bearer, position, featured = false }: Props) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-3xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20",
        featured ? "sm:p-10" : ""
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-center overflow-hidden rounded-full border-4 border-background bg-secondary transition-transform duration-700 group-hover:scale-105",
          featured ? "h-40 w-40 sm:h-48 sm:w-48 shadow-lg" : "h-28 w-28 sm:h-32 sm:w-32 shadow-md"
        )}
      >
        {bearer.photo ? (
          <img
            src={bearer.photo}
            alt={`${bearer.name}, ${position}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-border/50 text-muted-foreground/30">
             <User className={cn("stroke-1", featured ? "h-20 w-20" : "h-12 w-12")} />
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-8 relative z-10">
        <h3
          className={cn(
            "font-display font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary",
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          )}
        >
          {bearer.name}
        </h3>
        <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
          {position}
        </p>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex rounded-full bg-background px-4 py-1.5 font-sans text-xs font-semibold tracking-widest text-muted-foreground border border-border group-hover:border-primary/30 transition-colors">
            {bearer.roll}
          </span>
        </div>
      </div>
    </article>
  );
}

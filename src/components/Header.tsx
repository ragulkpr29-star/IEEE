import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-navy text-white",
        isScrolled ? "shadow-md shadow-navy/20" : ""
      )}
    >
      {/* Top Branding Row */}
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300", isScrolled ? "py-2" : "py-3")}>
        <div className="flex items-center justify-between">

          {/* Left: Logos and Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="flex shrink-0 items-center transition-opacity hover:opacity-80"
              aria-label="Kongu Engineering College — Home"
            >
              <img
                src="/keclogo.png"
                alt="KEC Logo"
                className={cn("w-auto object-contain transition-all duration-300", isScrolled ? "h-10 sm:h-12" : "h-12 sm:h-14")}
              />
            </Link>

            <div className="hidden lg:flex flex-col justify-center border-l border-white/20 pl-6 h-10">
              <span className="font-display font-bold text-sm tracking-wider uppercase leading-tight text-white/95">
                IEEE Power & Energy Society
              </span>
              <span className="font-sans text-xs tracking-widest text-kec-light uppercase mt-0.5">
                Kongu Engineering College
              </span>
            </div>
          </div>

          {/* Right: IEEE Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex shrink-0 items-center transition-opacity hover:opacity-80">
              <img
                src="/peslogo.png"
                alt="IEEE PES Logo"
                className={cn("object-contain transition-all duration-300 bg-white rounded-full p-1", isScrolled ? "h-12 w-12 sm:h-14 sm:w-14" : "h-16 w-16 sm:h-20 sm:w-20")}
              />
            </Link>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none transition-colors ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </div>

      {/* Bottom Navigation Row (Desktop) */}
      <nav className="hidden lg:block border-t border-white/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex h-12 items-center justify-start gap-8">
            {navLinks.map((link) => {
              const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
              return (
                <li key={link.to} className="h-full flex items-center relative">
                  <Link
                    to={link.to}
                    className={cn(
                      "group relative text-xs font-bold uppercase tracking-widest transition-colors duration-200 h-full flex items-center px-1",
                      active ? "text-white" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}

                    {/* Active Indicator */}
                    {active ? (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-kec-light"
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ieee scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 origin-left" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/10 bg-navy shadow-xl absolute w-full left-0 z-50 overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navLinks.map((link, i) => {
                const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
                return (
                  <motion.div key={link.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.05 }}>
                    <Link
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block rounded-md px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors",
                        active
                          ? "bg-white/10 text-kec-light border-l-2 border-kec-light"
                          : "text-white/80 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { navLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Subtle background tech pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none circuit-pattern" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-6 mb-6">
              <img 
                src="/ieeelogo.png" 
                alt="IEEE Logo" 
                className="h-16 sm:h-20 w-auto object-contain"
              />
              <img 
                src="/peslogo.png" 
                alt="IEEE PES Logo" 
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <h3 className="font-display font-bold text-base tracking-wider uppercase mb-1">
              IEEE Power & Energy Society
            </h3>
            <p className="font-sans text-xs tracking-widest text-kec-light uppercase mb-2">
              Kongu Engineering College
            </p>
            <p className="font-sans text-sm text-white/60 mb-6">
              IEEE Student Branch – 29741
            </p>
            
            <div className="mt-auto pt-6 border-t border-white/10 w-full inline-block">
              <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-white/80">
                Powering Ideas.<br />
                Engineering the Future.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 lg:col-span-3 lg:col-start-6">
            <h4 className="font-display font-bold text-xs tracking-widest text-white/50 uppercase mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm text-white/70 hover:text-kec-light transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-kec-light transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="font-display font-bold text-xs tracking-widest text-white/50 uppercase mb-6">
              Contact
            </h4>
            <div className="font-sans text-sm text-white/70 leading-relaxed space-y-2">
              <p className="font-medium text-white/90">Kongu Engineering College</p>
              <p>Perundurai, Erode – 638060</p>
              <p>Tamil Nadu, India</p>
              <div className="pt-2 space-y-1">
                <p>
                  <a href="mailto:ieeekecpes@gmail.com" className="hover:text-kec-light transition-colors">
                    Email: ieeekecpes@gmail.com
                  </a>
                </p>
                <p>
                  <a href="https://www.instagram.com/ieee_kec_pes/" target="_blank" rel="noopener noreferrer" className="hover:text-kec-light transition-colors">
                    Instagram: @ieee_kec_pes
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/40">
            © 2026 IEEE Power & Energy Society · Kongu Engineering College
          </p>
        </div>
      </div>
    </footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { org } from "@/data/navigation";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
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
              Reach Out
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              CONTACT US
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto font-light">
              We're here to answer any questions about IEEE PES Kongu Engineering College.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16 sm:py-24 min-h-[50vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-3xl font-bold text-navy uppercase mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-kec" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Location</h3>
                    <p className="font-sans text-foreground font-medium">{org.college}</p>
                    <p className="font-sans text-muted-foreground">{org.address}</p>
                    <p className="font-sans text-muted-foreground">Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-ieee" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email</h3>
                    <a href="mailto:pes@kongu.edu" className="font-sans text-foreground font-medium hover:text-ieee transition-colors">
                      pes@kongu.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Phone</h3>
                    <p className="font-sans text-muted-foreground">Available upon official request</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-surface border border-border p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-ieee" />
                
                <h3 className="font-display text-2xl font-bold text-navy mb-6">Send a Message</h3>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy">Name</label>
                    <input type="text" id="name" className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy">Email</label>
                    <input type="email" id="email" className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy">Message</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-navy px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-ieee"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/registration")({
  component: Registration,
});

const steps = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Academic Details" },
  { id: 3, name: "Contact Details" },
];

function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
              Membership
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              JOIN IEEE PES
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto font-light">
              Register your interest to join the Power & Energy Society at Kongu Engineering College.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16 sm:py-24 min-h-[50vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <div className="bg-surface border border-border p-6 sm:p-12 shadow-sm relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ieee to-kec" />
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-kec/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-kec" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-navy mb-4">Registration Received!</h2>
                  <p className="text-muted-foreground font-sans mb-8">
                    Thank you for expressing interest in joining IEEE PES KEC. Our team will contact you shortly with the next steps.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="inline-flex items-center gap-2 bg-navy px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white hover:bg-ieee transition-colors"
                  >
                    Register Another Member
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Stepper Header */}
                  <div className="mb-12">
                    <nav aria-label="Progress">
                      <ol role="list" className="flex items-center">
                        {steps.map((step, stepIdx) => (
                          <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                            <div className="flex items-center">
                              <div
                                className={cn(
                                  "relative flex h-8 w-8 items-center justify-center rounded-full font-sans text-xs font-bold transition-colors duration-300",
                                  currentStep > step.id 
                                    ? "bg-kec text-white" 
                                    : currentStep === step.id
                                      ? "bg-ieee text-white ring-4 ring-ieee/20"
                                      : "bg-surface border-2 border-border text-muted-foreground"
                                )}
                              >
                                {currentStep > step.id ? (
                                  <Check className="h-4 w-4 text-white" aria-hidden="true" />
                                ) : (
                                  step.id
                                )}
                              </div>
                            </div>
                            {stepIdx !== steps.length - 1 ? (
                              <div className="absolute top-4 left-8 -ml-px h-0.5 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] bg-border">
                                <div 
                                  className="h-full bg-kec transition-all duration-500 ease-out" 
                                  style={{ width: currentStep > step.id ? '100%' : '0%' }}
                                />
                              </div>
                            ) : null}
                          </li>
                        ))}
                      </ol>
                    </nav>
                    <div className="mt-6 flex items-center justify-between">
                      <h2 className="font-display text-xl font-bold text-navy">
                        {steps[currentStep - 1].name}
                      </h2>
                      <span className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Step {currentStep} of {steps.length}
                      </span>
                    </div>
                  </div>

                  {/* Form Content */}
                  <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                    
                    {currentStep === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="fullName" className="block text-sm font-medium text-navy">Full Name</label>
                          <input type="text" name="fullName" id="fullName" required className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                        </div>
                        <div>
                          <label htmlFor="dob" className="block text-sm font-medium text-navy">Date of Birth</label>
                          <input type="date" name="dob" id="dob" required className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                        </div>
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-navy">Gender</label>
                          <select id="gender" name="gender" required className="mt-1 block w-full border border-border bg-background py-2.5 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="rollNumber" className="block text-sm font-medium text-navy">Roll Number</label>
                          <input type="text" name="rollNumber" id="rollNumber" placeholder="e.g. 24EER001" required className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                        </div>
                        <div>
                          <label htmlFor="year" className="block text-sm font-medium text-navy">Year of Study</label>
                          <select id="year" name="year" required className="mt-1 block w-full border border-border bg-background py-2.5 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec">
                            <option value="">Select...</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="department" className="block text-sm font-medium text-navy">Department</label>
                          <input type="text" name="department" id="department" defaultValue="Electrical and Electronics Engineering" required className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-medium text-navy">College Email Address</label>
                          <input type="email" name="email" id="email" placeholder="example@kongu.edu" required className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-navy">Phone Number</label>
                          <input type="tel" name="phone" id="phone" required className="mt-1 block w-full border border-border bg-background py-2 px-3 text-foreground focus:border-kec focus:outline-none focus:ring-1 focus:ring-kec" />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="ieeeMember" className="flex items-center mt-2">
                            <input id="ieeeMember" name="ieeeMember" type="checkbox" className="h-4 w-4 border-border text-ieee focus:ring-ieee rounded-sm" />
                            <span className="ml-2 block text-sm text-foreground">I am already an IEEE member</span>
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="pt-8 border-t border-border flex items-center justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={cn(
                          "px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest transition-colors",
                          currentStep === 1 ? "opacity-50 cursor-not-allowed text-muted-foreground" : "text-navy hover:bg-background border border-border"
                        )}
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 bg-ieee px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-navy"
                      >
                        {currentStep === steps.length ? "Submit" : "Continue"}
                        {currentStep !== steps.length && (
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </section>
    </SiteLayout>
  );
}

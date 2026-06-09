import { ParticleField } from "./ParticleField";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <ParticleField />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          AI-assisted threat awareness platform
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          Outsmart Hackers. <br />
          <span className="text-gradient">Defend Your Digital Life.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Expose phishing links in <span className="text-primary font-semibold">under a second</span>,
          decode the tactics cybercriminals use, and chat with an AI that turns
          security jargon into plain English. Your shield against the modern web.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#detector"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_oklch(0.85_0.18_180/0.4)] hover:shadow-[0_0_60px_oklch(0.85_0.18_180/0.7)] transition-all hover:-translate-y-0.5"
          >
            <ShieldCheck className="h-4 w-4" />
            Try Phishing Detector
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#awareness"
            className="inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 text-sm font-semibold hover:border-primary/50 transition"
          >
            Explore awareness
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="h-10 w-6 rounded-full border-2 border-primary/40 flex justify-center pt-1.5">
          <span className="h-2 w-1 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}

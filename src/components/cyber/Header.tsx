import { useEffect, useState } from "react";
import { Shield, Menu, X, Radar } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#awareness", label: "Awareness" },
  { href: "#detector", label: "Detector" },
  { href: "#chatbot", label: "Assistant" },
  { href: "#videos", label: "Videos" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = links.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= y) { setActive(links[i].href.slice(1)); break; }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass border-b border-border"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Scan-line sweep across header */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{
            animation: "scan-line 4s linear infinite",
            top: "0%",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/30 animate-glow-pulse">
            <Shield className="h-5 w-5 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-background" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Cyber<span className="text-gradient">Aware</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:text-primary ${
                active === l.href.slice(1)
                  ? "text-primary bg-primary/5"
                  : "text-foreground/70 hover:bg-primary/5"
              }`}
            >
              {l.label}
              {active === l.href.slice(1) && (
                <span className="absolute inset-x-2 -bottom-px h-px rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#detector"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:from-primary/30 hover:to-accent/30 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.85_0.18_180/0.2)]"
          >
            <Radar className="h-4 w-4" />
            Scan Now
          </a>

          <button
            aria-label="Toggle menu"
            className="md:hidden grid h-10 w-10 place-items-center rounded-lg glass hover:bg-primary/10 transition-colors"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="mx-6 glass rounded-xl p-3 flex flex-col gap-1 border border-border">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === l.href.slice(1)
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:bg-secondary"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#detector"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-2.5 text-sm font-semibold text-primary"
          >
            <Radar className="h-4 w-4" />
            Scan Now
          </a>
        </div>
      </div>
    </header>
  );
}

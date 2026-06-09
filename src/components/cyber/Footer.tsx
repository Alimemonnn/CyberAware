import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 mt-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>© 2026 CyberAware. Stay safe online.</span>
        </div>
        <div className="flex gap-5">
          <a href="#detector" className="hover:text-primary transition">Detector</a>
          <a href="#awareness" className="hover:text-primary transition">Awareness</a>
          <a href="#chatbot" className="hover:text-primary transition">Assistant</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

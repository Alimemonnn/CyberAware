import { useState } from "react";
import { ShieldCheck, ShieldAlert, Shield, Loader2, Link2 } from "lucide-react";
import { analyzeContent, type PhishingResult } from "@/lib/phishing-detector";

const examples = [
  "Dear customer, your PayPaI account has been suspended. Verify now: http://paypa1-security.tk/login?id=99",
  "Hi! Long time no see. Check out this photo http://bit.ly/3xZsa1",
  "Hello John, your invoice from Acme Corp is attached. Let me know if you have questions.",
];

const levelStyles: Record<PhishingResult["level"], { ring: string; bg: string; text: string; label: string; Icon: typeof Shield }> = {
  safe: { ring: "ring-success/40", bg: "bg-success/10", text: "text-success", label: "Looks safe", Icon: ShieldCheck },
  suspicious: { ring: "ring-warning/40", bg: "bg-warning/10", text: "text-warning", label: "Suspicious", Icon: Shield },
  dangerous: { ring: "ring-destructive/50", bg: "bg-destructive/10", text: "text-destructive", label: "Dangerous", Icon: ShieldAlert },
};

export function Detector() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PhishingResult | null>(null);

  const run = (text: string) => {
    setLoading(true);
    setResult(null);
    // small simulated scan delay for UX
    setTimeout(() => {
      setResult(analyzeContent(text));
      setLoading(false);
    }, 450);
  };

  const onAnalyze = () => run(input);

  return (
    <section id="detector" className="py-24 px-6 relative">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Live tool</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Phishing Detector</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Paste a suspicious URL, email, or text message. We'll scan it for known phishing patterns.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8">
          <label className="block text-sm font-medium mb-2">Message or URL to analyze</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="Paste an email body, SMS, or a suspicious link…"
            className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 resize-y"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(ex); run(ex); }}
                  className="text-xs rounded-full glass px-3 py-1.5 hover:border-primary/40 transition"
                >
                  Try example {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={onAnalyze}
              disabled={!input.trim() || loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {loading ? "Scanning…" : "Analyze"}
            </button>
          </div>

          {result && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-3">
              {(() => {
                const s = levelStyles[result.level];
                const Icon = s.Icon;
                return (
                  <div className={`rounded-2xl ring-1 ${s.ring} ${s.bg} p-6`}>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.bg} ring-1 ${s.ring}`}>
                          <Icon className={`h-6 w-6 ${s.text}`} />
                        </div>
                        <div>
                          <div className={`text-lg font-semibold ${s.text}`}>{s.label}</div>
                          <div className="text-xs text-muted-foreground">Risk score</div>
                        </div>
                      </div>
                      <div className="font-display text-4xl font-bold tabular-nums">
                        {result.score}<span className="text-base text-muted-foreground">/100</span>
                      </div>
                    </div>

                    <div className="mt-5 h-2 rounded-full bg-background/60 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${result.score}%`,
                          background: result.level === "dangerous"
                            ? "linear-gradient(90deg, oklch(0.7 0.22 27), oklch(0.65 0.25 15))"
                            : result.level === "suspicious"
                              ? "linear-gradient(90deg, oklch(0.85 0.18 90), oklch(0.78 0.2 60))"
                              : "linear-gradient(90deg, oklch(0.85 0.18 180), oklch(0.78 0.2 155))",
                        }}
                      />
                    </div>

                    <ul className="mt-6 space-y-2">
                      {result.reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${s.text.replace("text-", "bg-")}`} />
                          <span className="text-foreground/90">{r}</span>
                        </li>
                      ))}
                    </ul>

                    {result.matchedUrls.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-border">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Detected links</div>
                        <ul className="space-y-1">
                          {result.matchedUrls.map((u, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-mono text-muted-foreground break-all">
                              <Link2 className="h-3 w-3 flex-shrink-0" />{u}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

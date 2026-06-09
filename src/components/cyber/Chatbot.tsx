import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const KB: { q: RegExp; a: string }[] = [
  { q: /phish/i, a: "Phishing is when attackers impersonate a trusted brand to trick you into revealing passwords or installing malware. Check the sender's exact domain, hover over links before clicking, and never enter credentials from an email link." },
  { q: /password|passphrase/i, a: "Use a unique 16+ character passphrase per account, stored in a password manager like Bitwarden or 1Password. Combine that with authenticator-app 2FA for accounts that matter." },
  { q: /2fa|two[- ]?factor|mfa/i, a: "Two-factor authentication adds a second proof of identity after your password. Prefer authenticator apps or hardware keys over SMS — SIM swap attacks can intercept text codes." },
  { q: /vpn/i, a: "A VPN encrypts your traffic between you and the VPN server. Useful on untrusted Wi-Fi, but it is NOT a substitute for HTTPS, antivirus, or good password hygiene." },
  { q: /malware|virus|ransomware/i, a: "Keep your OS and apps updated, only install software from official stores, and run a reputable antivirus. Back up important files offline so ransomware can't hold them hostage." },
  { q: /scam|fraud|romance|investment/i, a: "Classic scam signals: urgency, secrecy, unusual payment methods (gift cards, crypto, wire), and promises that sound too good. Slow down and verify through an independent channel." },
  { q: /wifi|public network/i, a: "Public Wi-Fi is fine for casual browsing. For banking, email, or anything sensitive, use a trusted VPN or your phone's hotspot." },
  { q: /breach|leaked|pwned/i, a: "Check haveibeenpwned.com with your email. If a site you use was breached, change that password (and any reused passwords) and enable 2FA immediately." },
  { q: /update|patch/i, a: "Most attacks exploit vulnerabilities that already have patches. Turn on automatic updates for your OS, browser, and apps — and reboot when prompted." },
  { q: /report|reporting/i, a: "Report phishing emails to your provider (Gmail/Outlook have built-in buttons), then to your IT team if it's work-related. For scams, file with your country's cybercrime authority (e.g. IC3 in the US, Action Fraud in the UK)." },
];

const QUICK = ["What is phishing?", "How do I make a strong password?", "Is public Wi-Fi safe?", "How do I report a scam?"];

function answer(q: string): string {
  for (const { q: re, a } of KB) if (re.test(q)) return a;
  return "Good question! I'm tuned for common cybersecurity topics — try asking about phishing, passwords, 2FA, scams, malware, VPNs, or breaches.";
}

export function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm your CyberAware assistant. Ask me anything about staying safe online." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: answer(q) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <section id="chatbot" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Ask anything</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Security Assistant</h2>
          <p className="mt-3 text-muted-foreground">Plain-English answers about staying safe online.</p>
        </div>

        <div className="glass rounded-3xl overflow-hidden">
          <div ref={scroller} className="h-[380px] overflow-y-auto p-6 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30 flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-accent/20 ring-1 ring-accent/30 flex-shrink-0">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "240ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-4 bg-background/40">
            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs rounded-full bg-secondary px-3 py-1.5 hover:bg-primary/15 hover:text-primary transition"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 rounded-xl bg-background/60 border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
              />
              <button
                type="submit"
                className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground hover:opacity-90 transition"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

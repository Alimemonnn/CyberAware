import { useState } from "react";
import { Lock, Fish, AlertTriangle, KeyRound, Wifi, CreditCard, X, ChevronLeft, ChevronRight } from "lucide-react";

type Topic = {
  icon: typeof Lock;
  title: string;
  blurb: string;
  body: string[];
};

const topics: Topic[] = [
  {
    icon: Lock, title: "Digital Safety Basics",
    blurb: "Foundational habits that block 90% of attacks before they start.",
    body: [
      "Enable two-factor authentication everywhere. A leaked password alone won't let an attacker in if 2FA stands between them and your account.",
      "Keep your OS, browser, and apps on auto-update. Most breaches exploit bugs that were patched months ago.",
      "Use a password manager. Reusing passwords is how one small breach becomes a complete identity takeover.",
      "Lock your devices with biometrics or a strong PIN, and enable remote wipe in case they're lost.",
    ],
  },
  {
    icon: Fish, title: "Phishing Attacks",
    blurb: "How attackers trick you with fake emails, texts and login pages.",
    body: [
      "Phishing is the #1 way accounts get hijacked. Attackers send a message that looks legitimate and rush you to click before you think.",
      "Red flags: urgent tone, generic greetings, mismatched sender domains, links that hover to a different URL, and attachments you didn't expect.",
      "Never enter credentials from a link in an email. Open the site directly from your bookmarks or by typing the address.",
      "Use our Phishing Detector below to scan suspicious messages and links in seconds.",
    ],
  },
  {
    icon: AlertTriangle, title: "Online Scams",
    blurb: "Spot investment, romance, job and marketplace scams.",
    body: [
      "If an opportunity guarantees high returns with no risk, it's a scam. Real investments fluctuate.",
      "Romance scams build trust over weeks then ask for money — often via crypto or gift cards. No legitimate partner needs that.",
      "Fake job offers ask you to pay for training, equipment, or background checks upfront. Real employers never charge candidates.",
      "On marketplaces, never move off-platform, never accept overpayments, and never ship before payment clears.",
    ],
  },
  {
    icon: KeyRound, title: "Password Security",
    blurb: "Strong, unique passwords plus 2FA = a hard target.",
    body: [
      "Length beats complexity. A 16+ character passphrase is stronger and easier to remember than 'P@ssw0rd!'.",
      "Never reuse passwords across sites. Breached credential lists are tested against every major service automatically.",
      "Use a reputable password manager (Bitwarden, 1Password, iCloud Keychain) to generate and store unique passwords.",
      "Prefer authenticator-app 2FA over SMS where possible — SIM swap attacks can intercept text codes.",
    ],
  },
  {
    icon: Wifi, title: "Safe Browsing",
    blurb: "Wi-Fi, HTTPS, extensions — what to trust and what to avoid.",
    body: [
      "Always check for HTTPS and a valid certificate before entering sensitive info. The padlock alone isn't enough — verify the domain.",
      "Public Wi-Fi is fine for casual browsing, but use a trusted VPN or your phone's hotspot for banking and email.",
      "Audit browser extensions monthly. Malicious extensions can read every page you visit.",
      "Avoid downloading 'free' versions of paid software — they're a common malware delivery channel.",
    ],
  },
  {
    icon: CreditCard, title: "Financial Safety",
    blurb: "Protect your bank, cards, and crypto from takeover.",
    body: [
      "Turn on transaction alerts for every card and account. Fraud is easiest to reverse when caught within hours.",
      "Use virtual or single-use card numbers for online purchases when your bank supports them.",
      "Never share OTPs, PINs, or seed phrases — no legitimate company or support agent will ever ask.",
      "For crypto, use a hardware wallet for long-term holdings. Exchange accounts should have withdrawal whitelists enabled.",
    ],
  },
];

export function Awareness() {
  const [open, setOpen] = useState<number | null>(null);

  const close = () => setOpen(null);
  const prev = () => setOpen((i) => (i === null ? 0 : (i - 1 + topics.length) % topics.length));
  const next = () => setOpen((i) => (i === null ? 0 : (i + 1) % topics.length));

  return (
    <section id="awareness" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Knowledge base</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Cybersecurity Awareness</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Bite-sized lessons covering the threats that target real people every day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.title}
                onClick={() => setOpen(i)}
                className="group text-left glass rounded-2xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.blurb}</p>
                <div className="mt-4 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition">
                  Read more →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in"
          onClick={close}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          <div
            className="relative glass max-w-2xl w-full rounded-2xl p-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
              Topic {open + 1} / {topics.length}
            </p>
            <h3 className="font-display text-3xl font-bold mb-5">{topics[open].title}</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {topics[open].body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={prev} className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2 text-sm hover:border-primary/40">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button onClick={next} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

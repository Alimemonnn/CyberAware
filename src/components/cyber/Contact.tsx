import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Get in touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Contact Us</h2>
          <p className="mt-3 text-muted-foreground">Report a threat, suggest a topic, or just say hi.</p>
        </div>

        <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="jane@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              maxLength={1000}
              className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 resize-y"
              placeholder="Tell us what's on your mind…"
              required
            />
          </div>
          <button
            type="submit"
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 transition disabled:opacity-70"
          >
            {sent ? <><CheckCircle2 className="h-4 w-4" /> Sent — thank you!</> : <><Send className="h-4 w-4" /> Send message</>}
          </button>
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <Mail className="h-3 w-3" /> Or email us at <span className="text-primary">hello@cyberaware.app</span>
          </p>
        </form>
      </div>
    </section>
  );
}

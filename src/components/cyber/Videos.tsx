import { Play } from "lucide-react";

const videos = [
  { title: "How to Avoid Phishing", desc: "Spot fake emails and links in under 10 seconds.", id: "XBkzBrXlle0" },
  { title: "Safe Browsing Habits", desc: "Daily habits that keep your data private.", id: "inWWhr5tnEA" },
  { title: "Strong Password Creation", desc: "Build passwords attackers can't crack.", id: "3NjQ9b3pgIg" },
];

export function Videos() {
  return (
    <section id="videos" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Watch & learn</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Video Tutorials</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-[0_0_30px_oklch(0.85_0.18_180/0.6)] group-hover:scale-110 transition">
                    <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

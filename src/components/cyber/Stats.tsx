import { useEffect, useRef, useState } from "react";
import { ShieldAlert, Users, Target, Zap } from "lucide-react";

const items = [
  { icon: ShieldAlert, label: "Threats analyzed", value: 124530, suffix: "+" },
  { icon: Users, label: "Users protected", value: 38200, suffix: "+" },
  { icon: Target, label: "Detection accuracy", value: 97, suffix: "%" },
  { icon: Zap, label: "Avg. scan time", value: 1.2, suffix: "s" },
];

function useCountUp(end: number, start: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start]);
  return n;
}

function Stat({ Icon, label, value, suffix, start }: { Icon: typeof ShieldAlert; label: string; value: number; suffix: string; start: boolean }) {
  const n = useCountUp(value, start);
  const display = value >= 1000
    ? Math.floor(n).toLocaleString()
    : value % 1 !== 0
      ? n.toFixed(1)
      : Math.floor(n).toString();
  return (
    <div className="glass rounded-2xl p-6 group hover:border-primary/40 transition">
      <Icon className="h-6 w-6 text-primary mb-4" />
      <div className="font-display text-4xl font-bold text-gradient">{display}{suffix}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} className="py-20 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-5">
        {items.map((it) => (
          <Stat key={it.label} Icon={it.icon} label={it.label} value={it.value} suffix={it.suffix} start={start} />
        ))}
      </div>
    </section>
  );
}

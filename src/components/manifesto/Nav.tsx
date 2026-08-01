import { useEffect, useState } from "react";

const links = [
  { href: "#why-now", label: "Why now" },
  { href: "#signals", label: "Evidence" },
  { href: "#category", label: "Agent-Ready Cloud" },
  { href: "#manifesto", label: "Manifesto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a href="#top" className="kicker text-foreground">
          Catalyst 3.0
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="h-px w-full bg-transparent">
        <div
          className="h-px bg-signal transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </nav>
  );
}

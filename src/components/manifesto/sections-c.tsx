import { useEffect, useRef, useState } from "react";
import { Reveal, Section } from "./primitives";
import maniVembuAsset from "@/assets/mani-vembu-lineart.png.asset.json";

function ThesisQuote({ children }: { children: string }) {
  const ref = useRef<HTMLQuoteElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = children.trim().split(/\s+/);
  return (
    <blockquote
      ref={ref}
      className="display text-[clamp(2rem,5vw,4rem)] leading-[1.05]"
      aria-label={children}
      data-visible={visible}
    >
      <span className="thesis-quote-mark" data-visible={visible}>“</span>
      {words.map((word, i) => (
        <span
          key={i}
          className="thesis-word"
          data-visible={visible}
          style={{ transitionDelay: `${120 + i * 55}ms` }}
        >
          {word}
        </span>
      ))}
      <span className="thesis-quote-mark" data-visible={visible}>”</span>
    </blockquote>
  );
}

/* SECTION 13 — Vision */
export function Vision() {
  return (
    <div className="bg-foreground text-background [&_.kicker]:text-background/60">
      <Section id="vision" kicker="Vision: Cloud Independence">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <ThesisQuote>
                The best infrastructure is the infrastructure developers never have to think about.
              </ThesisQuote>
            </Reveal>

            <Reveal delay={140}>
              <figcaption className="mt-10 md:mt-12">
                <div className="flex items-start gap-5">
                  <span
                    className="mt-3 h-12 w-1 shrink-0 rounded-full bg-signal"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans text-lg font-semibold tracking-tight text-background md:text-xl">
                      Mani Vembu
                    </span>
                    <span className="mt-1 text-sm font-medium uppercase tracking-widest text-background/50">
                      Chief Executive Officer, Zoho
                    </span>
                  </div>
                </div>
              </figcaption>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-background/75 md:text-xl">
                That is the standard Catalyst 3.0 is built for: infrastructure that gets out of the way so developers and AI agents can ship.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <a
                href="#catalyst"
                className="group mt-8 inline-flex items-center gap-3 border border-background/25 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                <span>See how Catalyst 3.0 delivers it</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <figure className="relative overflow-hidden">
              <img
                src={maniVembuAsset.url}
                alt="Line-art portrait illustration of Mani Vembu"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full mix-blend-multiply"
              />
            </figure>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}


/* SECTION 15 — Manifesto */

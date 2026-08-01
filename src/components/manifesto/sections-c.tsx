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

  const paragraphs = children.trim().split(/\n\n+/);
  let wordIndex = 0;
  return (
    <blockquote
      ref={ref}
      className="font-display font-light italic text-[clamp(1.15rem,2.2vw,1.85rem)] leading-[1.26] tracking-[-0.01em]"
      aria-label={children}
      data-visible={visible}
    >
      <span className="thesis-quote-mark" data-visible={visible}>“</span>
      {paragraphs.map((paragraph, pIdx) => {
        const words = paragraph.split(/\s+/);
        const isLast = pIdx === paragraphs.length - 1;
        return (
          <span key={pIdx} className={pIdx > 0 ? "block mt-4" : undefined}>
            {words.map((word) => {
              const i = wordIndex++;
              return (
                <span
                  key={i}
                  className="thesis-word"
                  data-visible={visible}
                  style={{ transitionDelay: `${120 + i * 55}ms` }}
                >
                  {word}
                </span>
              );
            })}
            {!isLast && <br />}
          </span>
        );
      })}
      <span className="thesis-quote-mark" data-visible={visible}>”</span>
    </blockquote>
  );
}

/* SECTION 13 — Vision */
export function Vision() {
  return (
    <div className="bg-foreground text-background [&_.kicker]:text-background/60">
      <Section id="vision" kicker="Vision: Cloud Independence">
        <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Quote column */}
          <div className="relative z-10 min-w-0 lg:col-span-7">
            <Reveal>
              <div className="relative">
                {/* Oversized decorative quote mark */}
                <span
                  className="pointer-events-none absolute -left-3 -top-8 select-none font-display text-[6rem] leading-none text-background/[0.06] md:-left-6 md:-top-12 md:text-[9rem]"
                  aria-hidden="true"
                >
                  “
                </span>
                <ThesisQuote>
                  Cloud Independence is when developers stop adapting to the cloud, and the cloud starts adapting to how software is built. Developers should build software. The platform should take care of everything else.

                  That's the future Catalyst is built for.
                </ThesisQuote>

              </div>
            </Reveal>

            <Reveal delay={160}>
              <figcaption className="mt-10 md:mt-14">
                <div className="flex items-start gap-5">
                  <span
                    className="mt-2 h-14 w-1 shrink-0 rounded-full bg-signal"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans text-xl font-semibold tracking-tight text-background md:text-2xl">
                      Mani Vembu
                    </span>
                    <span className="mt-1 text-sm font-medium uppercase tracking-widest text-background/50">
                      Chief Executive Officer, Zoho
                    </span>
                  </div>
                </div>
              </figcaption>
            </Reveal>


            <Reveal delay={320}>
              <a
                href="#category"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-signal transition-colors hover:text-signal/80"
              >
                See how Catalyst 3.0 delivers it
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>

          </div>

          {/* Portrait column */}
          <Reveal delay={220} className="min-w-0 lg:col-span-5">
            <figure className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
              {/* Soft circular backdrop */}
              <div
                className="absolute inset-0 rounded-full bg-background/[0.04]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-[8%] rounded-full bg-gradient-to-br from-signal/10 via-transparent to-cool/10 blur-2xl"
                aria-hidden="true"
              />
              <img
                src={maniVembuAsset.url}
                alt="Line-art portrait illustration of Mani Vembu"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative z-10 h-full w-full object-contain p-6"
              />
            </figure>
          </Reveal>
        </div>

        {/* Bottom editorial accent line */}
        <div className="pointer-events-none mt-16 h-px w-32 bg-gradient-to-r from-background/30 to-transparent md:mt-20" />
      </Section>
    </div>
  );
}


/* SECTION 15 — Manifesto */

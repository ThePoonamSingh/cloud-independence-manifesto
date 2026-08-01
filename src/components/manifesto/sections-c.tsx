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
      className="font-display italic text-[clamp(2.5rem,6vw,5rem)] leading-[1.1]"
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
                Cloud Independence is when developers stop adapting to the cloud, and the cloud starts adapting to how software is built. Developers should build software. The platform should take care of everything else. That's the future we're building with Catalyst.
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

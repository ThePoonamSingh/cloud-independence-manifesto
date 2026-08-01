import { useState } from "react";
import { Reveal, Section } from "./primitives";
import maniVembuAsset from "@/assets/mani-vembu-lineart.png.asset.json";

/* SECTION 13 — Vision */
export function Vision() {
  return (
    <div className="bg-foreground text-background [&_.kicker]:text-background/60">
      <Section id="vision" kicker="Vision">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <blockquote className="display text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
                “The best infrastructure is the infrastructure developers never have to think about.”
              </blockquote>
            </Reveal>
            <Reveal delay={120}>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-signal" />
                <span className="kicker">
                  Mani Vembu, Chief Executive Officer, Zoho
                </span>
              </figcaption>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-background/70 md:text-xl">
                That is the standard Catalyst 3.0 was built to meet. One platform that
                takes the infrastructure problem off the developer’s plate — and off
                the AI’s too.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <a
                href="#catalyst"
                className="group mt-8 inline-flex items-center gap-3 border border-background/25 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                <span>See how Catalyst 3.0 delivers it</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={180}>
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

/* SECTION 14 — Journalist FAQ */
const faqs = [
  {
    q: "What is Cloud Independence?",
    a: "A movement toward software that is not held hostage by the infrastructure beneath it. Freedom from infrastructure complexity, from vendor sprawl, and freedom for AI to build within safe boundaries. It is a posture, not a product, and not a nationality.",
  },
  {
    q: "What is an Agent-Ready Cloud?",
    a: "A cloud platform designed for both developers and AI agents, where infrastructure, services and platform knowledge are understandable by machines — enabling AI to build, deploy and operate production systems with minimal human intervention.",
  },
  {
    q: "How is this different from AWS or Azure?",
    a: "Hyperscalers sell primitives assembled by humans. An Agent-Ready Cloud publishes its own capabilities in machine-readable form, so an agent can discover, compose and operate them without a human translating documentation into configuration.",
  },
  {
    q: "Why now?",
    a: "Because authorship changed. When a meaningful share of production code is machine-generated, the interface between builder and platform stops being a console and starts being a protocol.",
  },
  {
    q: "Is AI replacing developers?",
    a: "No. It is relocating them. Developers move from assembly to direction: defining intent, constraints and acceptable risk, then supervising systems that execute inside those limits.",
  },
  {
    q: "What makes Catalyst different?",
    a: "It is one platform covering idea to operation, built by a company that owns its cloud, its AI, its developer platform and the business applications that run on all three.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" kicker="Questions journalists ask">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">On the record.</h2>
      </Reveal>
      <div className="mt-16 border-t border-border">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-8 py-7 text-left"
            >
              <span className="text-xl md:text-2xl">{f.q}</span>
              <span
                className={`text-muted-foreground transition-transform duration-300 ${open === i ? "rotate-45 text-signal" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* SECTION 15 — Manifesto */
const lines = [
  "Software should outlive infrastructure.",
  "Infrastructure should disappear.",
  "Developers should create.",
  "AI should operate safely.",
  "Cloud should understand machines.",
  "Build software. Not infrastructure.",
];

export function Manifesto() {
  return (
    <section id="manifesto" className="relative border-y border-border veil">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <p className="kicker text-signal">The Manifesto</p>
      </div>
      {lines.map((l, i) => (
        <div
          key={l}
          className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-6 md:min-h-screen md:px-10"
        >
          <Reveal>
            <p className="display text-[clamp(2.5rem,8vw,7rem)]">{l}</p>
            <p className="kicker mt-8">
              {String(i + 1).padStart(2, "0")} / {String(lines.length).padStart(2, "0")}
            </p>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

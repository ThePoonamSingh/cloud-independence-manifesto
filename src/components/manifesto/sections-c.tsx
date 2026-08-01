import { useState } from "react";
import { Reveal, Section } from "./primitives";

/* SECTION 13 — Media Center */
const kit = [
  { t: "Press Kit", d: "Complete archive, 24 MB", f: "catalyst-3-press-kit.zip" },
  { t: "Executive Brief", d: "8-page PDF", f: "cloud-independence-executive-brief.pdf" },
  { t: "Media Deck", d: "18 slides, PDF", f: "catalyst-3-media-deck.pdf" },
  { t: "High-resolution Logos", d: "SVG + PNG", f: "catalyst-logos.zip" },
  { t: "Brand Assets", d: "Colour, type, usage", f: "catalyst-brand-assets.zip" },
  { t: "Executive Photos", d: "Print resolution", f: "catalyst-executive-photos.zip" },
  { t: "Product Screenshots", d: "Console and IDE", f: "catalyst-screenshots.zip" },
  { t: "Architecture Diagrams", d: "Agent-Ready Cloud", f: "agent-ready-cloud-diagrams.zip" },
  { t: "Press Release", d: "Full text, PDF", f: "catalyst-3-press-release.pdf" },
  { t: "Journalist FAQ", d: "Definitions and framing", f: "journalist-faq.pdf" },
  { t: "The Manifesto (PDF)", d: "Print-ready", f: "cloud-independence-manifesto.pdf" },
];

export function MediaCenter() {
  return (
    <Section id="media" index="13" kicker="Media centre">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">
          Everything a newsroom needs, without an email.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {kit.map((k, i) => (
          <Reveal key={k.t} delay={i * 40}>
            <a
              href={`/media/${k.f}`}
              download
              className="group flex h-full items-start justify-between gap-6 bg-background p-7 transition-colors hover:bg-card"
            >
              <span>
                <span className="block text-lg">{k.t}</span>
                <span className="kicker mt-2 block">{k.d}</span>
              </span>
              <span className="text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-signal">
                ↓
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a
          href="mailto:press@catalyst.example"
          className="mt-10 inline-flex border border-border px-6 py-3 text-sm transition-colors hover:border-signal hover:text-signal"
        >
          Contact PR
        </a>
      </Reveal>
    </Section>
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
  {
    q: "Can I quote these definitions?",
    a: "Yes. Every definition and pull quote on this page is intended for citation. Attribution: Catalyst 3.0, The Cloud Independence Manifesto.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" index="14" kicker="Questions journalists ask">
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
        <p className="kicker text-signal">15 · The Manifesto</p>
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

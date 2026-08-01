import { useEffect, useRef, useState } from "react";
import { Reveal, Section, useReveal } from "./primitives";

/* Platform eras — rendered as a compact strip inside Shift */
const eras = [
  { name: "Mainframes", years: "1960s" },
  { name: "Client Server", years: "1980s" },
  { name: "Web", years: "1990s" },
  { name: "Cloud", years: "2006" },
  { name: "Mobile", years: "2007" },
  { name: "AI", years: "Now" },
];

function EraStrip() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="relative mt-4">
      <div
        className="absolute left-0 top-1.5 h-px bg-signal transition-[width] duration-[1600ms] ease-out"
        style={{ width: visible ? "100%" : "0%" }}
      />
      <div className="grid grid-cols-3 gap-y-8 md:grid-cols-6">
        {eras.map((e, i) => (
          <div key={e.name} className="relative pr-4">
            <span
              className="block h-3 w-3 rounded-full border border-signal bg-background transition-opacity duration-500"
              style={{ opacity: visible ? 1 : 0, transitionDelay: `${200 + i * 180}ms` }}
            />
            <p className="mt-4 text-sm md:text-base">{e.name}</p>
            <p className="kicker mt-1">{e.years}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


/* SECTION 2 — Signals */
const signals = [
  {
    stat: "41%",
    claim: "of new code in AI-assisted repositories is machine-generated.",
    detail:
      "The authorship of software is shifting. Review, policy and runtime guarantees become the bottleneck.",
    source: "GitHub Octoverse, 2024",
  },
  {
    stat: "90%",
    claim: "of enterprise engineers will use AI code assistants by 2028.",
    detail:
      "Up from less than 14% in early 2024. The role shifts from implementation to orchestration — problem solving, system design, and ensuring AI output is production-ready.",
    source: "Gartner, 2024",
  },
  {
    stat: "66%",
    claim: "of developers say their top frustration is AI output that is almost right, but not quite.",
    detail:
      "The follow-on cost lands on debugging, environments and operations — the work that was never the product.",
    source: "Stack Overflow Developer Survey, 2025",
  },
];

export function Signals() {
  return (
    <Section id="signals">
      <Reveal>
        <p className="kicker mb-6 text-signal">Why now?</p>
        <h2 className="display max-w-4xl text-4xl md:text-6xl">
          The old contract between developers and infrastructure is breaking.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
        {signals.map((s, i) => (
          <Reveal key={s.stat} delay={i * 60}>
            <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10">
              <p className="display text-6xl text-signal md:text-7xl">{s.stat}</p>
              <p className="mt-6 text-base leading-relaxed">{s.claim}</p>
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-4 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                </div>
              </div>
              <p className="kicker mt-6">Source · {s.source}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* SECTION 3 — Yesterday / Today / Tomorrow */
const states = [
  { t: "Yesterday", h: "Developers wrote code.", d: "Craft measured in keystrokes and commits." },
  {
    t: "Today",
    h: "Developers describe intent.",
    d: "Prompt, review, refine. The compiler moved up a level.",
  },
  {
    t: "Tomorrow",
    h: "Developers supervise software creation.",
    d: "Humans set direction and constraints. Machines do the assembly.",
  },
];

export function Shift() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % states.length), 3600);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <Section id="shift">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          Every platform shift changed how software gets built. AI is creating the next one.
        </h2>
        <p className="mt-8 max-w-2xl text-muted-foreground">
          The compiler moved up a level. The next platform must move infrastructure out of the way.
        </p>
        <EraStrip />
      </Reveal>
      <div ref={ref} className="relative mt-16">
        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-signal blur-[6px] transition-[left] duration-700 ease-out md:blur-[8px]"
          style={{ left: `${(active / states.length) * 100}%` }}
        />
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {states.map((s, i) => (
            <button
              key={s.t}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`relative bg-background p-8 text-left transition-all duration-700 md:p-12 ${
                active === i ? "bg-card" : ""
              }`}
            >
              <span
                className="absolute left-0 top-0 h-px bg-signal transition-[width] duration-700"
                style={{ width: active === i ? "100%" : "0%" }}
              />
              <p className={`kicker ${active === i ? "text-signal" : ""}`}>{s.t}</p>
              <p
                className={`display mt-6 text-2xl transition-opacity duration-700 md:text-4xl ${
                  active === i ? "opacity-100" : "opacity-45"
                }`}
              >
                {s.h}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">{s.d}</p>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* SECTION 5 — Patchwork Stack */
const vendors = [
  { name: "AWS", top: "10%", left: "12%", driftX: -10, driftY: 5, rotStart: -2, rotEnd: 1, delay: 0, stress: false },
  { name: "Azure", top: "14%", left: "28%", driftX: 8, driftY: 10, rotStart: 3, rotEnd: -2, delay: 0.4, stress: false },
  { name: "GCP", top: "8%", left: "44%", driftX: -6, driftY: -4, rotStart: -1, rotEnd: 2, delay: 0.8, stress: false },
  { name: "Datadog", top: "5%", left: "62%", driftX: 5, driftY: -8, rotStart: 1, rotEnd: -1, delay: 1.2, stress: true },
  { name: "Snowflake", top: "12%", left: "78%", driftX: 12, driftY: -5, rotStart: 2, rotEnd: -3, delay: 0.2, stress: false },
  { name: "PagerDuty", top: "34%", left: "6%", driftX: -5, driftY: -5, rotStart: -4, rotEnd: 2, delay: 0.6, stress: false },
  { name: "Vercel", top: "30%", left: "22%", driftX: -8, driftY: 15, rotStart: -1, rotEnd: 3, delay: 1.0, stress: false },
  { name: "MongoDB", top: "38%", left: "38%", driftX: 0, driftY: 12, rotStart: -1, rotEnd: 1, delay: 0.3, stress: false },
  { name: "Auth0", top: "32%", left: "54%", driftX: 5, driftY: 5, rotStart: -3, rotEnd: 1, delay: 1.4, stress: true },
  { name: "Stripe", top: "36%", left: "72%", driftX: -15, driftY: 5, rotStart: -2, rotEnd: 2, delay: 0.5, stress: false },
  { name: "Supabase", top: "42%", left: "86%", driftX: 10, driftY: -10, rotStart: 5, rotEnd: -2, delay: 0.9, stress: false },
  { name: "Cloudflare", top: "58%", left: "16%", driftX: -8, driftY: 15, rotStart: -1, rotEnd: 3, delay: 0.7, stress: false },
  { name: "GitHub", top: "56%", left: "34%", driftX: 10, driftY: -10, rotStart: 5, rotEnd: -2, delay: 1.1, stress: false },
  { name: "OpenAI", top: "62%", left: "50%", driftX: 5, driftY: 5, rotStart: -3, rotEnd: 1, delay: 0.1, stress: false },
  { name: "Pinecone", top: "58%", left: "68%", driftX: -20, driftY: -10, rotStart: 2, rotEnd: -4, delay: 1.3, stress: false },
  { name: "Terraform", top: "66%", left: "82%", driftX: 12, driftY: -5, rotStart: 2, rotEnd: -3, delay: 0.45, stress: false },
  { name: "Kafka", top: "76%", left: "42%", driftX: -2, driftY: 2, rotStart: 0, rotEnd: 0, delay: 1.5, stress: true },
  { name: "…", top: "80%", left: "64%", driftX: 8, driftY: 6, rotStart: -2, rotEnd: 2, delay: 1.6, stress: false },
];

const webPaths = [
  { d: "M 80,120 Q 220,40 400,120 T 720,100", width: 1.5, dash: "6 10", duration: "4s" },
  { d: "M 60,260 Q 240,340 420,240 T 760,300", width: 1, dash: "3 8", duration: "6s" },
  { d: "M 120,60 C 260,160 460,260 660,160", width: 0.5, dash: "4 6", duration: "5s" },
  { d: "M 280,40 L 420,180 L 560,320", width: 0.5, dash: "2 6", duration: "7s" },
];

export function Frankenstack() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const painCards = [
    {
      title: "More\nVendors.",
      body: "Fragmented identity, billing, and permissions across a dozen isolated consoles.",
    },
    {
      title: "More\nComplexity.",
      body: "Proprietary APIs and brittle abstractions that break with every update.",
    },
    {
      title: "More\nDebt.",
      body: "Engineering teams spend half their sprint cycles on keep-the-lights-on glue code.",
    },
  ];
  return (
    <Section id="patchwork-stack" kicker="The problem">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          This is the patchwork stack.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Every feature already travels through a dozen vendors, a dozen dashboards, and a dozen
          bills before it reaches a user — and someone on the team has to hold all of it in their
          head.
        </p>
      </Reveal>

      <div
        ref={ref}
        className="mt-16 grid gap-px border border-border bg-border lg:grid-cols-[1.4fr_0.6fr]"
      >
        <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-background md:min-h-[32rem] lg:min-h-[40rem]">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, color-mix(in oklab, var(--color-cold) 10%, transparent), transparent 70%)",
            }}
          />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 340"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {webPaths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                stroke="var(--color-signal)"
                strokeWidth={p.width}
                strokeDasharray={p.dash}
                className="opacity-0 transition-opacity duration-700"
                style={{
                  opacity: visible ? 0.6 : 0,
                  animation: visible ? `line-pulse ${p.duration} linear infinite` : "none",
                  animationDelay: visible ? `${0.3 + i * 0.25}s` : "0s",
                  filter: visible ? "drop-shadow(0 0 4px color-mix(in oklab, var(--color-signal) 50%, transparent))" : "none",
                }}
              />
            ))}
          </svg>

          <div className="tag-container relative h-full w-full">
            {vendors.map((v, i) => (
              <span
                key={v.name}
                className={`absolute inline-block border bg-card px-3 py-1.5 font-mono text-sm transition-all duration-700 hover:-translate-y-1 hover:border-signal/60 ${
                  v.stress
                    ? "border-signal/40 text-foreground shadow-[0_0_18px_color-mix(in_oklab,var(--color-signal)_20%,transparent)]"
                    : "border-border text-muted-foreground"
                }`}
                style={{
                  top: v.top,
                  left: v.left,
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : "translateY(12px)",
                  transitionDelay: `${i * 60}ms`,
                  ["--drift-x" as string]: `${v.driftX}px`,
                  ["--drift-y" as string]: `${v.driftY}px`,
                  ["--rot-start" as string]: `${v.rotStart}deg`,
                  ["--rot-end" as string]: `${v.rotEnd}deg`,
                  animation: visible
                    ? `tag-drift ${v.stress ? 10 : 12}s ease-in-out ${v.delay}s infinite${
                        v.stress ? ", stress-jitter 0.2s ease-in-out infinite" : ""
                      }`
                    : "none",
                }}
              >
                {v.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-border">
          {painCards.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col justify-center bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10"
            >
              <h3 className="display text-2xl uppercase leading-none tracking-tight transition-colors group-hover:text-pain md:text-3xl">
                {item.title.split("\n").map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* SECTION 6 — Cloud Independence */
const freedoms = [
  {
    title: "Freedom from infrastructure complexity.",
    body: "You write the application. The serverless platform absorbs the servers, config, security, deploys, and operations. Your ideas ship instead of sitting in configuration queues.",
  },
  {
    title: "Freedom from vendor sprawl.",
    body: "One integrated stack replaces a dozen isolated consoles, identity providers, billing cycles, and support tickets. Not a different vendor — a different shape of work entirely.",
  },
  {
    title: "Freedom to focus on software.",
    body: "Engineering hours stop disappearing into glue code, runbooks, and yak-shaving. The team returns to product, performance, and user experience.",
  },
  {
    title: "Freedom for AI to build safely.",
    body: "Machine-readable, policy-guarded infrastructure lets autonomous agents provision, deploy, and observe without guessing — or breaking production.",
  },
];

function FreedomRow({
  item,
  index,
}: {
  item: { title: string; body: string };
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const base = index * 90;
  return (
    <div
      ref={ref}
      className="group relative grid gap-8 bg-background p-8 transition-colors duration-500 hover:bg-card md:grid-cols-2 md:gap-16 md:p-12 lg:p-16"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-700 ease-out group-hover:scale-y-100"
      />
      <div
        className="flex items-start gap-4 transition-[opacity,transform] duration-700 ease-out md:group-hover:translate-x-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? undefined : "translateY(14px)",
          transitionDelay: `${base}ms`,
        }}
      >
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-signal transition-transform duration-500 group-hover:scale-150" />
        <h3 className="display text-2xl md:text-4xl lg:text-5xl">{item.title}</h3>
      </div>
      <div
        className="flex items-center transition-[opacity,transform] duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0.001,
          transform: visible ? undefined : "translateY(14px)",
          transitionDelay: `${base + 140}ms`,
        }}
      >
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground md:text-lg">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export function Independence() {
  return (
    <Section
      id="independence"
      kicker="Cloud Independence means…"
      kickerClassName="font-display text-4xl font-normal leading-[1.1] tracking-tight md:text-5xl lg:text-6xl normal-case"
    >
      <div className="mt-16 space-y-px border-t border-border bg-border">
        {freedoms.map((item, i) => (
          <FreedomRow key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}



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
              <p className="prose-body mt-6 text-base">{s.claim}</p>
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="prose-body pt-4 text-sm text-muted-foreground">{s.detail}</p>
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
        <p className="lede mt-8 text-base text-muted-foreground md:text-lg">
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
              <p className="prose-body mt-5 text-sm text-muted-foreground">{s.d}</p>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* SECTION 5 — Patchwork Stack */
const C0 = 86, C1 = 240, C2 = 394, C3 = 548, C4 = 702;
const R0 = 70, R1 = 190, R2 = 310, R3 = 430;

/* Snake routing: one request dragged left→right→left through every vendor */
const mazeNodes: { name: string; x: number; y: number; stress?: boolean }[] = [
  { name: "request", x: C0, y: R0 },
  { name: "Cloudflare", x: C1, y: R0 },
  { name: "Auth0", x: C2, y: R0, stress: true },
  { name: "AWS", x: C3, y: R0 },
  { name: "Datadog", x: C4, y: R0, stress: true },
  { name: "Vercel", x: C4, y: R1 },
  { name: "Stripe", x: C3, y: R1 },
  { name: "MongoDB", x: C2, y: R1 },
  { name: "Kafka", x: C1, y: R1, stress: true },
  { name: "PagerDuty", x: C0, y: R1 },
  { name: "GitHub", x: C0, y: R2 },
  { name: "Terraform", x: C1, y: R2 },
  { name: "OpenAI", x: C2, y: R2 },
  { name: "Pinecone", x: C3, y: R2 },
  { name: "Snowflake", x: C4, y: R2 },
  { name: "Azure", x: C4, y: R3 },
  { name: "Supabase", x: C3, y: R3 },
  { name: "GCP", x: C2, y: R3 },
  { name: "…", x: C1, y: R3 },
  { name: "user", x: C0, y: R3 },
];

const MAZE_PATH = `M ${C0},${R0} H ${C4} V ${R1} H ${C0} V ${R2} H ${C4} V ${R3} H ${C0}`;
const MAZE_LEN = (C4 - C0) * 4 + (R3 - R0);

/* Dead ends and retries branching off the main route */
const deadEnds = [
  `M ${C1},${R0} V ${R0 + 46} H ${C1 + 58}`,
  `M ${C3},${R1} V ${R1 - 44} H ${C3 - 64}`,
  `M ${C2},${R2} V ${R2 + 42} H ${C2 + 70}`,
  `M ${C4},${R2} V ${R2 - 40} H ${C4 - 52}`,
  `M ${C1},${R3} V ${R3 - 48} H ${C1 - 40}`,
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
        <p className="lede mt-7 text-lg text-muted-foreground md:text-xl">
          Every feature already travels through a dozen vendors, a dozen dashboards, and a dozen
          bills before it reaches a user — and someone on the team has to hold all of it in their
          head.
        </p>
      </Reveal>

      <div
        ref={ref}
        className="mt-16 grid gap-px border border-border bg-border lg:grid-cols-[1.4fr_0.6fr]"
      >
        <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden bg-background p-4 md:min-h-[32rem] md:p-8 lg:min-h-[40rem]">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 50% 50%, color-mix(in oklab, var(--color-cold) 10%, transparent), transparent 70%)",
            }}
          />

          <svg
            className="relative h-full w-full"
            viewBox="0 0 788 500"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <pattern id="maze-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M 44 0 L 0 0 0 44" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="788" height="500" fill="url(#maze-grid)" opacity="0.35" />

            {/* dead ends / retries */}
            {deadEnds.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="var(--color-signal)"
                strokeWidth="1"
                strokeDasharray="3 7"
                style={{
                  opacity: visible ? 0.35 : 0,
                  transition: "opacity 900ms ease",
                  transitionDelay: `${600 + i * 120}ms`,
                  animation: visible ? `line-pulse ${5 + i}s linear infinite` : "none",
                }}
              />
            ))}
            {deadEnds.map((d, i) => {
              const parts = d.split(" ");
              const ex = Number(parts[parts.length - 1]);
              const ey = Number(parts[3]);
              return (
                <g key={`x${i}`} style={{ opacity: visible ? 0.5 : 0, transition: "opacity 900ms ease", transitionDelay: `${900 + i * 120}ms` }}>
                  <path
                    d={`M ${ex - 4},${ey - 4} L ${ex + 4},${ey + 4} M ${ex + 4},${ey - 4} L ${ex - 4},${ey + 4}`}
                    stroke="var(--color-signal)"
                    strokeWidth="1.2"
                  />
                </g>
              );
            })}

            {/* the route */}
            <path
              d={MAZE_PATH}
              stroke="var(--color-border)"
              strokeWidth="1.5"
              style={{
                strokeDasharray: MAZE_LEN,
                strokeDashoffset: visible ? 0 : MAZE_LEN,
                transition: "stroke-dashoffset 3.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            />

            {/* travelling request */}
            {visible && (
              <path
                d={MAZE_PATH}
                stroke="var(--color-signal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`70 ${MAZE_LEN}`}
                style={{
                  filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--color-signal) 70%, transparent))",
                  animation: `maze-trace 9s linear 1.2s infinite`,
                  ["--maze-len" as string]: `${MAZE_LEN + 70}`,
                }}
              />
            )}

            {/* nodes */}
            {mazeNodes.map((n, i) => {
              const w = Math.max(52, n.name.length * 7.4 + 18);
              const endpoint = n.name === "request" || n.name === "user";
              return (
                <g
                  key={n.name}
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 600ms ease",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <rect
                    x={n.x - w / 2}
                    y={n.y - 13}
                    width={w}
                    height={26}
                    fill="var(--color-background)"
                    stroke={n.stress ? "color-mix(in oklab, var(--color-signal) 55%, transparent)" : "var(--color-border)"}
                    strokeWidth="1"
                    style={
                      n.stress
                        ? { filter: "drop-shadow(0 0 10px color-mix(in oklab, var(--color-signal) 25%, transparent))" }
                        : undefined
                    }
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="11"
                    fill={
                      endpoint
                        ? "var(--color-foreground)"
                        : n.stress
                          ? "color-mix(in oklab, var(--color-signal) 85%, white)"
                          : "var(--color-muted-foreground)"
                    }
                    letterSpacing="0.04em"
                  >
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:text-[11px]">
            <span>one feature</span>
            <span className="text-signal">20 hops · 5 dead ends</span>
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
              <p className="prose-body mt-4 text-sm text-muted-foreground">{item.body}</p>
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
        <p className="prose-body text-base text-muted-foreground transition-colors duration-500 group-hover:text-foreground md:text-lg">
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



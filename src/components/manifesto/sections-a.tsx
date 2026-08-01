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
const C0 = 108, C1 = 305, C2 = 502, C3 = 692;
const R0 = 54, R1 = 152, R2 = 250, R3 = 348, R4 = 446;

/* What actually happens when one feature ships: task → the vendor that owns it */
const mazeNodes: {
  task: string;
  vendor: string;
  x: number;
  y: number;
  stress?: boolean;
  does: string;
  why: string;
}[] = [
  { task: "write code", vendor: "local", x: C0, y: R0,
    does: "`npm run dev` against a half-mocked local stack — queues stubbed, auth faked.",
    why: "Local never matches production, so the first honest test happens after deploy." },
  { task: "commit + review", vendor: "GitHub", x: C1, y: R0,
    does: "Open the PR, wait on two approvals, rebase after main moves.",
    why: "Review latency, not code, sets your cycle time." },
  { task: "run CI", vendor: "Actions", x: C2, y: R0,
    does: "14-minute matrix build; re-run job #3 because the flaky e2e timed out again.",
    why: "Every re-run is a context switch you never planned for." },
  { task: "build image", vendor: "Docker", x: C3, y: R0,
    does: "Rebuild layers because a base image bumped a transitive CVE patch.",
    why: "You maintain a build system you never wanted to own." },
  { task: "push artifact", vendor: "Registry", x: C3, y: R1,
    does: "Tag `v1.42.3`, push 900MB, prune old tags before the quota alarm fires.",
    why: "Artifact hygiene is unpaid work with a monthly bill attached." },
  { task: "provision infra", vendor: "Terraform", x: C2, y: R1, stress: true,
    does: "`terraform plan` shows 3 changes you didn't make — someone hotfixed in the console.",
    why: "State drift means the plan output can no longer be trusted at a glance." },
  { task: "store secrets", vendor: "Vault", x: C1, y: R1, stress: true,
    does: "Rotate the DB credential, then update it in CI, the runtime, and one forgotten cron.",
    why: "Secrets live in four places, so rotation is a mini-outage waiting to happen." },
  { task: "wire IAM roles", vendor: "AWS", x: C0, y: R1, stress: true,
    does: "Add `s3:GetObject` to one prefix; policy denied; file a ticket with platform team.",
    why: "A permission change becomes a two-day dependency on another human." },
  { task: "deploy", vendor: "Vercel", x: C0, y: R2,
    does: "Promote the build, watch the canary, roll back by re-promoting the previous deploy.",
    why: "Rollback is fast for the frontend and manual for everything behind it." },
  { task: "route + DNS", vendor: "Cloudflare", x: C1, y: R2,
    does: "Add the new path to the WAF rules and purge the cache so users see the change.",
    why: "The edge has its own config, its own cache, and its own way to fail." },
  { task: "sign users in", vendor: "Auth0", x: C2, y: R2,
    does: "Add a role claim, update the rule script, re-issue tokens for existing sessions.",
    why: "Identity lives outside your codebase, so authz drifts from the app it protects." },
  { task: "persist data", vendor: "MongoDB", x: C3, y: R2,
    does: "Ship the migration, backfill 4M docs in batches, add the index during low traffic.",
    why: "Schema change is a scheduling problem, not a code problem." },
  { task: "cache reads", vendor: "Redis", x: C3, y: R3,
    does: "Invalidate keys on write, discover a stale key path only after support pings you.",
    why: "Cache correctness is invisible until it's a customer-facing bug." },
  { task: "queue jobs", vendor: "Kafka", x: C2, y: R3,
    does: "Consumer lag spikes; replay the DLQ and hope the handler is actually idempotent.",
    why: "Async failure modes need their own runbook and their own on-call knowledge." },
  { task: "take payment", vendor: "Stripe", x: C1, y: R3,
    does: "Verify the webhook signature, dedupe retries, reconcile against your own ledger.",
    why: "Money paths demand exactly-once behaviour on an at-least-once transport." },
  { task: "call the model", vendor: "OpenAI", x: C0, y: R3,
    does: "429 at peak; add backoff, a fallback model, and a per-tenant token budget.",
    why: "Rate limits turn a product feature into a capacity-planning exercise." },
  { task: "store embeddings", vendor: "Pinecone", x: C0, y: R4,
    does: "Re-embed the corpus after a model change and keep two indexes live during cutover.",
    why: "Every model upgrade is a data migration in disguise." },
  { task: "ship logs", vendor: "Datadog", x: C1, y: R4,
    does: "Add trace IDs, then trim log volume when ingest costs jump mid-month.",
    why: "You end up rationing the observability you need most during incidents." },
  { task: "page on-call", vendor: "PagerDuty", x: C2, y: R4, stress: true,
    does: "2:14am page for a threshold that fires on a known noisy dependency.",
    why: "Alert noise trains teams to ignore the alerts that actually matter." },
  { task: "report usage", vendor: "Snowflake", x: C3, y: R4,
    does: "Stitch billing events from five vendors to answer 'what did this feature cost?'",
    why: "Nobody can attribute cost per feature without a bespoke pipeline." },
];


const MAZE_PATH = `M ${C0},${R0} H ${C3} V ${R1} H ${C0} V ${R2} H ${C3} V ${R3} H ${C0} V ${R4} H ${C3}`;
const MAZE_LEN = (C3 - C0) * 5 + (R4 - R0);

/* Dead ends: the retries, tickets, and quota walls between hops */
const deadEnds: { d: string; label: string }[] = [
  { d: `M ${C1},${R0} V ${R0 + 44} H ${C1 + 62}`, label: "flaky test" },
  { d: `M ${C2},${R1} V ${R1 - 40} H ${C2 - 66}`, label: "state drift" },
  { d: `M ${C0},${R2} V ${R2 + 40} H ${C0 + 62}`, label: "perms ticket" },
  { d: `M ${C3},${R2} V ${R2 - 38} H ${C3 - 62}`, label: "rate limit" },
  { d: `M ${C1},${R4} V ${R4 - 42} H ${C1 - 58}`, label: "alert noise" },
];




export function Frankenstack() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeHop, setActiveHop] = useState<number | null>(null);
  const hop = activeHop === null ? null : (mazeNodes[activeHop] ?? null);
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
            viewBox="0 0 800 500"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <pattern id="maze-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#maze-grid)" opacity="0.3" />

            {/* dead ends: retries, tickets, quota walls */}
            {deadEnds.map((b, i) => {
              const parts = b.d.split(" ");
              const ex = Number(parts[parts.length - 1]);
              const ey = Number(parts[3]);
              return (
                <g
                  key={b.label}
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 900ms ease",
                    transitionDelay: `${900 + i * 120}ms`,
                  }}
                >
                  <path
                    d={b.d}
                    stroke="var(--color-signal)"
                    strokeWidth="1"
                    strokeDasharray="3 6"
                    opacity="0.45"
                    style={{ animation: visible ? `line-pulse ${5 + i}s linear infinite` : "none" }}
                  />
                  <path
                    d={`M ${ex - 4},${ey - 4} L ${ex + 4},${ey + 4} M ${ex + 4},${ey - 4} L ${ex - 4},${ey + 4}`}
                    stroke="var(--color-signal)"
                    strokeWidth="1.3"
                    opacity="0.75"
                  />
                  <text
                    x={ex + 10}
                    y={ey + 3.5}
                    className="font-mono"
                    fontSize="9.5"
                    fill="color-mix(in oklab, var(--color-signal) 70%, white)"
                    opacity="0.8"
                  >
                    {b.label}
                  </text>
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

            {/* the feature travelling through every system */}
            {visible && (
              <path
                d={MAZE_PATH}
                stroke="var(--color-signal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`70 ${MAZE_LEN}`}
                style={{
                  filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--color-signal) 70%, transparent))",
                  animation: `maze-trace 11s linear 1.2s infinite`,
                  ["--maze-len" as string]: `${MAZE_LEN + 70}`,
                }}
              />
            )}

            {/* task → vendor nodes */}
            {mazeNodes.map((n, i) => {
              const w = Math.max(112, Math.max(n.task.length, n.vendor.length) * 6.6 + 26);
              const isActive = activeHop === i;
              return (
                <g
                  key={n.vendor + n.task}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n.task} — ${n.vendor}`}
                  onClick={() => setActiveHop(isActive ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveHop(isActive ? null : i);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    opacity: visible ? (activeHop === null || isActive ? 1 : 0.4) : 0,
                    transition: "opacity 400ms ease",
                    transitionDelay: visible && activeHop === null ? `${i * 70}ms` : "0ms",
                  }}
                >
                  <rect
                    x={n.x - w / 2}
                    y={n.y - 21}
                    width={w}
                    height={42}
                    fill={isActive ? "var(--color-card)" : "var(--color-background)"}
                    stroke={
                      isActive
                        ? "var(--color-signal)"
                        : n.stress
                          ? "color-mix(in oklab, var(--color-signal) 55%, transparent)"
                          : "var(--color-border)"
                    }
                    strokeWidth={isActive ? 1.6 : 1}
                    style={
                      isActive || n.stress
                        ? {
                            filter: `drop-shadow(0 0 ${isActive ? 16 : 12}px color-mix(in oklab, var(--color-signal) ${isActive ? 45 : 22}%, transparent))`,
                          }
                        : undefined
                    }
                  />
                  <text
                    x={n.x}
                    y={n.y - 5}
                    textAnchor="middle"
                    className="pointer-events-none font-mono"
                    fontSize="9"
                    letterSpacing="0.12em"
                    fill="var(--color-muted-foreground)"
                    opacity="0.75"
                  >
                    {n.task.toUpperCase()}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + 12}
                    textAnchor="middle"
                    className="pointer-events-none font-mono"
                    fontSize="12"
                    fill={
                      isActive || n.stress
                        ? "color-mix(in oklab, var(--color-signal) 85%, white)"
                        : "var(--color-foreground)"
                    }
                  >
                    {n.vendor}
                  </text>
                </g>
              );
            })}
          </svg>

          {hop === null || activeHop === null ? (
            <div className="pointer-events-none absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:text-[11px]">
              <span>click any hop · ship one feature</span>
              <span className="text-signal">20 systems · 20 dashboards · 20 bills</span>
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 animate-fade-in border-t border-border bg-card/95 p-5 backdrop-blur md:p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                    hop {String(activeHop + 1).padStart(2, "0")} ·{" "}
                    {hop.task} · {hop.vendor}
                  </p>
                  <p className="prose-body mt-3 text-sm text-foreground md:text-base">
                    {hop.does}
                  </p>
                  <p className="prose-body mt-2 text-sm text-muted-foreground">
                    <span className="text-pain">Why it matters — </span>
                    {hop.why}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    aria-label="Previous hop"
                    onClick={() => setActiveHop((h) => ((h ?? 0) - 1 + mazeNodes.length) % mazeNodes.length)}
                    className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    ←
                  </button>
                  <button
                    aria-label="Next hop"
                    onClick={() => setActiveHop((h) => ((h ?? 0) + 1) % mazeNodes.length)}
                    className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    →
                  </button>
                  <button
                    aria-label="Close hop detail"
                    onClick={() => setActiveHop(null)}
                    className="ml-1 border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}


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

/* SECTION 5.5 — Provocation */
export function Provocation() {
  return (
    <Section id="provocation" className="border-t border-border">
      <div className="mx-auto max-w-5xl py-16 text-center md:py-24">
        <Reveal>
          <p className="display text-[clamp(1.85rem,5.2vw,4.25rem)] leading-[1.08]">
            Developers stopped writing every line of code.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="display mt-5 text-[clamp(1.85rem,5.2vw,4.25rem)] leading-[1.08]">
            Why should they still manage{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(100deg, var(--signal) 0%, var(--cool) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              every layer of infrastructure?
            </span>
          </p>
        </Reveal>
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



import { useEffect, useRef, useState } from "react";
import { Reveal, Section, PullQuote, useReveal } from "./primitives";

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
    stat: "723B",
    claim: "projected global cloud spend, in USD, for the coming year.",
    detail:
      "Spend keeps compounding while developer time spent on undifferentiated infrastructure stays flat.",
    source: "Gartner Public Cloud Forecast, 2025",
  },
  {
    stat: "65%",
    claim: "of developer time is spent on work that is not the product.",
    detail: "Pipelines, environments, glue code, upgrades, incidents. The tax nobody budgeted for.",
    source: "Stack Overflow Developer Survey, 2024",
  },
];

export function Signals() {
  return (
    <Section id="signals" kicker="The ground has already moved">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">Three independent signals.</h2>
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
    <Section id="shift" kicker="The new authorship">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          AI changed software. Now software must change cloud.
        </h2>
        <p className="mt-8 max-w-2xl text-muted-foreground">
          Every platform shift changed how software gets built. AI is creating the next one.
        </p>
        <EraStrip />
      </Reveal>
      <div ref={ref} className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
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
    </Section>
  );
}

/* SECTION 5 — Patchwork Stack */
const vendors = [
  { name: "AWS", twist: "rotate-2" },
  { name: "Azure", twist: "-rotate-3" },
  { name: "GCP", twist: "rotate-6 translate-x-2" },
  { name: "Datadog", twist: "-rotate-12 translate-y-1" },
  { name: "Snowflake", twist: "rotate-1 translate-x-1" },
  { name: "MongoDB", twist: "-rotate-6 translate-y-2" },
  { name: "Auth0", twist: "rotate-12 -translate-x-2" },
  { name: "Stripe", twist: "-rotate-2" },
  { name: "PagerDuty", twist: "rotate-3 translate-y-1" },
  { name: "Vercel", twist: "-rotate-8" },
  { name: "Supabase", twist: "rotate-6 translate-x-3" },
  { name: "Cloudflare", twist: "-rotate-3 translate-y-1" },
  { name: "GitHub", twist: "rotate-1" },
  { name: "OpenAI", twist: "-rotate-6 translate-x-2" },
  { name: "Pinecone", twist: "rotate-12 -translate-y-2" },
  { name: "Terraform", twist: "-rotate-1" },
  { name: "Kafka", twist: "rotate-4" },
  { name: "…", twist: "-rotate-2" },
];

export function Frankenstack() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const routePath =
    "M 40,80 C 120,80 140,40 220,40 S 320,120 400,120 S 500,60 580,60 S 680,130 760,130";
  return (
    <Section id="patchwork-stack" kicker="The problem">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          This is the stack developers ship on today.
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
        className="relative mt-16 flex h-80 items-center justify-center overflow-hidden md:h-96"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, color-mix(in oklab, var(--color-cold) 12%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 border border-border/50"
          style={{
            maskImage: "radial-gradient(circle, white, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle, white, transparent 70%)",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 800 180"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <path
            d={routePath}
            stroke="color-mix(in oklab, var(--color-signal) 25%, transparent)"
            strokeWidth="1"
            strokeDasharray="8 8"
            className="opacity-0 transition-opacity duration-700"
            style={{ opacity: visible ? 1 : 0 }}
          />
          <path
            d={routePath}
            stroke="var(--color-signal)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            className="opacity-0"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "route-draw 3.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
              animationDelay: visible ? "0.6s" : "0s",
            }}
          />
        </svg>

        <div className="relative flex max-w-3xl flex-wrap justify-center gap-2 px-4">
          {vendors.map((v, i) => (
            <span
              key={v.name}
              className={`border border-border bg-card px-3 py-1.5 font-mono text-sm text-muted-foreground transition-all duration-700 hover:-translate-y-1 ${v.twist}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? undefined : "translateY(12px)",
                transitionDelay: `${i * 60}ms`,
                animation: visible
                  ? `vendor-glow 2.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.16}s`
                  : "none",
              }}
            >
              {v.name}
            </span>
          ))}

          <div
            className="absolute left-0 top-0 h-3 w-3 rounded-full bg-signal shadow-[0_0_18px_var(--color-signal)]"
            style={{
              opacity: visible ? 1 : 0,
              offsetPath: `path('${routePath}')`,
              offsetRotate: "auto",
              animation: visible
                ? "packet-travel 3.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards"
                : "none",
            }}
          />
        </div>
      </div>

      <Reveal>
        <div className="mt-16 grid gap-px border-t border-border bg-border md:grid-cols-3">
          {[
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
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-card md:p-10"
            >
              <h3 className="display text-3xl uppercase leading-none tracking-tight transition-colors group-hover:text-pain md:text-4xl">
                {item.title.split("\n").map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* SECTION 6 — Cloud Independence */
const freedoms = [
  {
    title: "Freedom from infrastructure complexity.",
    body: "You write the application. The platform absorbs the servers, config, security, deploys, and operations. Your ideas ship instead of sitting in configuration queues.",
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
    <Section id="independence" kicker="The movement">
      <Reveal>
        <p className="text-lg text-muted-foreground md:text-2xl">
          Cloud Independence does <span className="text-foreground">not</span> mean using a
          different flag on your infrastructure.
        </p>
      </Reveal>

      <div className="mt-16 space-y-px border-t border-border bg-border">
        {freedoms.map((item, i) => (
          <FreedomRow key={item.title} item={item} index={i} />
        ))}
      </div>

      <Reveal>
        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-background p-8 md:p-10">
            <p className="kicker">Not vendor switching</p>
            <p className="mt-5 text-base text-muted-foreground">
              It is not about moving from one cloud provider to another. That just trades one vendor
              for another — and keeps the same infrastructure burden on your shoulders.
            </p>
          </div>
          <div className="bg-signal-soft p-8 md:p-10">
            <p className="kicker text-signal">It is freedom from infrastructure</p>
            <p className="mt-5 text-base text-muted-foreground">
              A single platform takes the infrastructure problem off the developer's plate — and off
              the AI's too.
            </p>
          </div>
        </div>
      </Reveal>

      <NeverTouchTags />
    </Section>
  );
}

/* SECTION 6b — The list you'll never open again */
const neverAgain = [
  "Dockerfiles",
  "Kubernetes manifests",
  "Terraform modules",
  "IAM policies",
  "VPCs & subnets",
  "Load balancers",
  "TLS certificates",
  "Autoscaling groups",
  "Helm charts",
  "CI/CD YAML",
  "Secret rotation",
  "Log pipelines",
  "Bastion hosts",
  "Cluster upgrades",
  "On-call runbooks",
];

function NeverTouchTags() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
      <Reveal>
        <p className="kicker">The list you'll never open again</p>
        <h3 className="display mt-5 text-3xl md:text-4xl">
          You'll never touch <em>this</em> again.
        </h3>
      </Reveal>
      <div ref={ref} className="flex flex-wrap gap-3 lg:justify-end lg:content-start">
        {neverAgain.map((item, i) => (
          <span
            key={item}
            className="relative rounded-full border border-border bg-card px-5 py-2.5 font-mono text-sm text-muted-foreground transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(8px)",
              transitionDelay: `${i * 70}ms`,
            }}
          >
            {item}
            <span
              aria-hidden
              className="absolute left-3 right-3 top-1/2 h-px bg-signal transition-transform duration-500 origin-left"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transitionDelay: `${400 + i * 70}ms`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

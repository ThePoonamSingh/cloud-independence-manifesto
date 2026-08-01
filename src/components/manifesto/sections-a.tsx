import { useEffect, useRef, useState } from "react";
import { Reveal, Section, PullQuote, useReveal } from "./primitives";

/* SECTION 1 — Why now */
const eras = [
  { name: "Mainframes", years: "1960s", note: "Compute was scarce and centralized." },
  { name: "Client Server", years: "1980s", note: "Software moved to the desk." },
  { name: "Web", years: "1990s", note: "Distribution became free." },
  { name: "Cloud", years: "2006", note: "Infrastructure became rented." },
  { name: "Mobile", years: "2007", note: "Software became ambient." },
  { name: "AI", years: "Now", note: "Software begins to write itself." },
];

export function WhyNow() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Section id="why-now" kicker="Why now">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          Every platform shift changes how software gets built.
          <span className="text-muted-foreground"> AI is creating the next one.</span>
        </h2>
      </Reveal>
      <div ref={ref} className="mt-20 md:mt-28">
        <div className="relative">
          <div
            className="absolute left-0 top-6 h-px bg-signal transition-[width] duration-[2000ms] ease-out"
            style={{ width: visible ? "100%" : "0%" }}
          />
          <div className="grid grid-cols-2 gap-y-14 md:grid-cols-6 md:gap-y-0">
            {eras.map((e, i) => (
              <div key={e.name} className="relative pr-6">
                <span
                  className="block h-3 w-3 -translate-y-1 rounded-full border border-signal bg-background transition-opacity duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${300 + i * 260}ms`,
                    marginTop: "1.25rem",
                  }}
                />
                <p
                  className="mt-6 text-lg transition-all duration-700 md:text-xl"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(10px)",
                    transitionDelay: `${420 + i * 260}ms`,
                  }}
                >
                  {e.name}
                </p>
                <p className="kicker mt-2">{e.years}</p>
                <p className="mt-3 max-w-[16rem] text-sm text-muted-foreground">{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* SECTION 2 — Signals */
const signals = [
  {
    stat: "78%",
    claim: "of organizations report using AI in at least one business function.",
    detail:
      "Adoption crossed from experiment to default in under 24 months — faster than cloud, faster than mobile.",
    source: "McKinsey, The State of AI, 2025",
  },
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
    stat: "90%",
    claim: "of enterprises will adopt a hybrid or multi-vendor posture.",
    detail: "Multi-vendor is now the default state — and the default source of operational debt.",
    source: "Gartner Cloud Strategy Outlook, 2025",
  },
  {
    stat: "65%",
    claim: "of developer time is spent on work that is not the product.",
    detail: "Pipelines, environments, glue code, upgrades, incidents. The tax nobody budgeted for.",
    source: "Stack Overflow Developer Survey, 2024",
  },
  {
    stat: "6×",
    claim: "growth in the number of vendors in a typical modern application stack.",
    detail: "Each integration adds surface area for failure, cost and security review.",
    source: "CNCF Annual Survey, 2024",
  },
];

export function Signals() {
  return (
    <Section id="signals" kicker="The ground has already moved">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">Six independent signals.</h2>
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

/* SECTION 4 — New customer */
const aiNeeds = [
  "Discover services",
  "Understand APIs",
  "Provision infrastructure",
  "Deploy",
  "Monitor",
  "Troubleshoot",
];

function Chain({ items, dim = false }: { items: string[]; dim?: boolean }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {items.map((it, i) => (
        <div key={it} className="flex flex-col items-start gap-3">
          <span
            className={`border px-4 py-2 font-mono text-sm ${
              dim ? "border-border text-muted-foreground" : "border-signal/50 text-foreground"
            }`}
          >
            {it}
          </span>
          {i < items.length - 1 && <span className="pl-4 text-muted-foreground">↓</span>}
        </div>
      ))}
    </div>
  );
}

export function NewCustomer() {
  return (
    <Section id="new-customer" kicker="The cloud has a new customer">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-6xl">
          Today's cloud was designed for humans. Tomorrow's cloud must be understandable by
          machines.
        </h2>
      </Reveal>
      <div className="mt-20 grid gap-16 md:grid-cols-3">
        <Reveal>
          <p className="kicker mb-8">Traditional</p>
          <Chain items={["Developer", "Cloud"]} dim />
        </Reveal>
        <Reveal delay={120}>
          <p className="kicker mb-8 text-signal">New</p>
          <Chain items={["Developer", "AI", "Cloud"]} />
        </Reveal>
        <Reveal delay={240}>
          <p className="kicker mb-8">AI needs to</p>
          <ul className="space-y-4">
            {aiNeeds.map((n) => (
              <li key={n} className="flex items-baseline gap-3 text-base">
                <span className="text-signal">✓</span>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
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
  return (
    <Section id="patchwork-stack" kicker="The problem">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          This is the stack developers ship on today.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Not a future risk. Not an edge case. Every feature already travels through a dozen
          vendors, a dozen dashboards, and a dozen bills before it reaches a user — and someone
          on the team has to hold all of it in their head.
        </p>
      </Reveal>


      <div
        ref={ref}
        className="relative mt-16 flex h-72 items-center justify-center overflow-hidden md:h-80"
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
        <div className="relative flex max-w-3xl flex-wrap justify-center gap-2 px-4">
          {vendors.map((v, i) => (
            <span
              key={v.name}
              className={`border border-border bg-card px-3 py-1.5 font-mono text-sm text-muted-foreground transition-all duration-700 hover:-translate-y-1 ${v.twist}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? undefined : "translateY(12px)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {v.name}
            </span>
          ))}
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
          <Reveal key={item.title} delay={i * 80}>
            <div className="grid gap-8 bg-background p-8 md:grid-cols-2 md:gap-16 md:p-12 lg:p-16">
              <div className="flex items-start gap-4">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-signal" />
                <h3 className="display text-2xl md:text-4xl lg:text-5xl">{item.title}</h3>
              </div>
              <div className="flex items-center">
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
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

export function NeverTouch() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Section id="never-touch" kicker="The list you'll never open again">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <Reveal>
          <h2 className="display text-4xl md:text-6xl">
            You'll never touch <em>this</em> again.
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            Every item here is real work that used to sit between your code and your users.
            Catalyst does it. You don't. That's what Cloud Independence means, concretely.
          </p>
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
    </Section>
  );
}


/* SECTION 7 — Thesis */
export function Thesis() {
  const traits = ["Machine-readable", "Discoverable", "Agent-friendly", "Composable"];
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section id="thesis" kicker="The thesis">
      <Reveal>
        <PullQuote text="Infrastructure has become knowledge." />
      </Reveal>
      <div ref={ref} className="mt-20 grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="border border-border p-8 md:p-10">
            <p className="kicker">Yesterday</p>
            <p className="display mt-4 text-3xl md:text-4xl">Cloud executed code.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="border border-signal/40 bg-signal-soft p-8 md:p-10">
            <p className="kicker text-signal">Tomorrow</p>
            <p className="display mt-4 text-3xl md:text-4xl">Cloud teaches AI how to build.</p>
          </div>
        </Reveal>
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        {traits.map((t, i) => (
          <Reveal key={t} delay={i * 80}>
            <span className="border border-border px-5 py-2 font-mono text-xs tracking-wide text-muted-foreground">
              {t}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

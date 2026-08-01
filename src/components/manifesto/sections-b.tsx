import { useEffect, useState } from "react";
import { Reveal, Section, useReveal } from "./primitives";

/* SECTION 8 — Category */
export function Category() {
  return (
    <Section id="category" className="relative overflow-hidden">
      {/* Kinetic nebula background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
          style={{
            background: "radial-gradient(circle, var(--cool-soft) 0%, transparent 70%)",
            animation: "nebula-drift 18s ease-in-out infinite, nebula-breathe 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--signal-soft) 0%, transparent 70%)",
            animation: "nebula-drift 22s ease-in-out infinite reverse, nebula-breathe 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-blue) 18%, transparent) 0%, transparent 70%)",
            animation: "nebula-drift 20s ease-in-out infinite, nebula-breathe 14s ease-in-out infinite",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Kicker with pulse */}
      <Reveal>
        <div className="relative z-10 mb-10 md:mb-16">
          <span className="kicker inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Introducing Catalyst 3.0
          </span>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h2 className="display relative z-10 text-[clamp(3rem,10vw,9rem)] leading-[0.95]">
          The agent-ready, full-stack{" "}
          <span
            className="block"
            style={{
              background: "linear-gradient(100deg, var(--cool) 0%, var(--signal) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 28px color-mix(in oklab, var(--cool) 35%, transparent))",
            }}
          >
            cloud
          </span>
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="relative z-10 mt-16 max-w-3xl text-xl leading-relaxed text-muted-foreground md:mt-24 md:text-3xl md:leading-[1.5]">
          A serverless cloud platform designed for both developers and AI agents, where infrastructure,
          services and platform knowledge are understandable by machines — enabling AI to build,
          deploy and operate production systems with minimal human intervention.
        </p>
        <a
          href="https://catalystagentstack.onslate.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative z-10 mt-8 inline-flex items-center gap-3 overflow-hidden border border-signal/40 bg-signal-soft px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-signal hover:text-foreground"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">See the Catalyst Agent Stack</span>
          <span className="relative text-xs transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        </a>
      </Reveal>
    </Section>
  );
}

/* SECTION 9 — One system, two builders */
const sharedInterfaces = ["MCP", "Agent Skills", "REST", "SDK"];
const platformCapabilities = [
  "Frontend",
  "Backend",
  "Database",
  "Storage",
  "AI",
  "Serverless",
  "DevOps",
  "Observability",
];

export function TwoBuilders() {
  return (
    <Section id="two-builders">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
        {/* Left: argument */}
        <div>
          <Reveal>
            <span className="kicker">One platform, two builders</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display mt-6 text-3xl leading-[1.05] md:text-5xl">
              The same surface for the human and the agent.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Developers and AI agents use the same platform through the same interfaces, with the
              same permissions and the same audit trail. Not a separate AI sandbox bolted onto a human
              product.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <a
              href="https://catalystagentstack.onslate.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              See the Catalyst Agent Stack
              <span className="text-xs">↗</span>
            </a>
          </Reveal>
        </div>

        {/* Right: architecture diagram */}
        <Reveal delay={200}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/60 to-background p-6 md:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cool/40 via-signal/40 to-transparent" />

            {/* Shared interfaces */}
            <div>
              <p className="kicker">Shared interfaces</p>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {sharedInterfaces.map((item, i) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cool to-signal px-4 py-3 text-center"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative text-sm font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="my-6 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background">
                <span className="text-xs text-muted-foreground">+</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Catalyst platform */}
            <div>
              <p className="kicker">Catalyst platform</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {platformCapabilities.map((item, i) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-foreground hover:text-foreground"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* SECTION 10 — Teaching AI how to build */
const flow = [
  { t: "Prompt", d: "A human states an outcome, not a runbook." },
  { t: "AI discovers Agent Skills", d: "The platform advertises what it can do, in machine terms." },
  { t: "Uses MCP", d: "A typed protocol replaces screen-scraping and guesswork." },
  { t: "Reads AI-ready docs", d: "Documentation written to be parsed, not just read." },
  { t: "Generates application", d: "Code, schema, policies and configuration together." },
  { t: "Deploys", d: "Environments, secrets and rollout handled by the serverless platform." },
  { t: "Operates production", d: "Observes, scales, remediates — inside guardrails." },
];

export function TeachingAI() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % flow.length), 2600);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <Section id="teaching" kicker="Go from prompt to production, without becoming a cloud expert.">
      <Reveal>
        <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-2xl md:leading-[1.5]">
          <p>
            AI can already generate code. Building production software is the harder problem. The gap
            between a generated application and a production-ready system is everything AI doesn't
            automatically handle: data, authentication, workflows, deployment, observability, and
            infrastructure. Catalyst is a full-stack cloud that closes the gap.
          </p>
          <p>
            Catalyst teaches AI how to discover services, understand platform capabilities, generate
            applications, deploy them, and safely operate them in production — turning prompts into
            production systems through one continuous workflow.
          </p>
        </div>
        <a
          href="https://catalystagentstack.onslate.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-cool"
        >
          Explore the Catalyst Agent Stack
          <span className="text-xs">↗</span>
        </a>
      </Reveal>
      <div ref={ref} className="mt-16 grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <ol className="border-l border-border">
          {flow.map((f, i) => (
            <li key={f.t}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative -ml-px block w-full border-l py-4 pl-6 text-left transition-colors duration-300 ${
                  active === i
                    ? "border-cool text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-xs opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ml-4 text-lg md:text-xl">{f.t}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="border border-border p-8 md:p-12">
          <p className="kicker text-cool">Step {String(active + 1).padStart(2, "0")}</p>
          <p className="display mt-6 text-3xl md:text-5xl">{flow[active]?.t}</p>
          <p className="mt-6 text-muted-foreground">{flow[active]?.d}</p>
        </div>
      </div>
    </Section>
  );
}

/* SECTION 11 — What's new in Catalyst 3.0 */
const pillars = [
  {
    kicker: "AI-Native Developer Experience",
    headline: "Built for developers and AI agents together",
    body: "Agent Skills, MCP support, AI-assisted workflows and IDE integrations mean Catalyst is understood by AI agents and used by developers inside the tools they already use.",
    accent: "cool",
  },
  {
    kicker: "Integrated Full-Stack Cloud",
    headline: "One platform, not a patchwork of services",
    body: "Compute, backend, authentication, storage, AI, deployment, integrations and operations are delivered as a single integrated system.",
    accent: "signal",
  },
  {
    kicker: "Serverless Foundation",
    headline: "Deploy code, not infrastructure",
    body: "No provisioning, capacity planning or server management. The platform automatically scales and operates the underlying infrastructure.",
    accent: "cool",
  },
  {
    kicker: "Open Ecosystem",
    headline: "Open-source SDKs, CLI and Slyte framework",
    body: "Open tooling gives developers transparency and gives AI agents a predictable interface for building, deploying and operating applications.",
    accent: "signal",
  },
];

export function WhatsNew() {
  return (
    <Section id="whats-new" className="gradient-section">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-7xl">
          How we built the cloud for the AI era.
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Because Zoho builds every layer of the application stack—from cloud infrastructure to
          developer tools and business applications—Catalyst is designed as one integrated system
          that helps developers and AI move from prompt to production without managing infrastructure.
        </p>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Catalyst 3.0 introduces an Agent-Ready Full-Stack Cloud — combining AI-native developer
          experience, an integrated platform, serverless infrastructure and an open ecosystem.
        </p>
      </Reveal>
      <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal key={p.kicker} delay={i * 80}>
            <div className="group relative h-full bg-background p-8 md:p-10">
              <span
                className={`absolute left-0 top-0 h-px w-0 transition-[width] duration-700 group-hover:w-full ${
                  p.accent === "cool" ? "bg-cool" : "bg-signal"
                }`}
              />
              <p className={`kicker ${p.accent === "cool" ? "text-cool" : "text-signal"}`}>
                {p.kicker}
              </p>
              <p className="display mt-5 text-xl md:text-2xl">{p.headline}</p>
              <p className="mt-4 text-sm text-muted-foreground">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a
          href="https://catalyst.zoho.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-3 border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Visit catalyst.zoho.com
          <span className="text-xs">↗</span>
        </a>
      </Reveal>
    </Section>
  );
}

/* SECTION 12 — Catalyst 3.0 deep dive */
const workflow = ["Idea", "Prompt", "Build", "Deploy", "Scale", "Observe", "Operate"];


export function Catalyst() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Section id="catalyst" kicker="Catalyst 3.0" className="gradient-section">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-7xl">
          Everything from prompt to production.
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          No service sprawl. No infrastructure assembly. No stitching together six different vendors.
        </p>
        <a
          href="https://catalyst.zoho.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Visit catalyst.zoho.com
          <span className="text-xs">↗</span>
        </a>
      </Reveal>
      <div ref={ref} className="mt-20 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-7">
        {workflow.map((w, i) => (
          <div
            key={w}
            className="bg-background p-6 transition-all duration-700 lg:p-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <p className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-6 text-lg">{w}</p>
          </div>
        ))}
      </div>

    </Section>
  );
}


/* SECTION 12 — Why Zoho */
export function WhyZoho() {
  const layers = [
    { t: "Own Cloud", d: "Data centres, network and runtime operated in-house." },
    { t: "Own AI", d: "Models and agent tooling built and hosted internally." },
    { t: "Own Developer Platform", d: "The build, deploy and operate surface itself." },
    { t: "Own Business Applications", d: "Real production workloads running on the same stack." },
  ];
  return (
    <Section id="why-catalyst">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">Why Catalyst.</h2>
      </Reveal>
      <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2">
        {layers.map((l, i) => (
          <Reveal key={l.t} delay={i * 80}>
            <div className="h-full bg-background p-8 md:p-10">
              <p className="text-2xl md:text-3xl">{l.t}</p>
              <p className="mt-4 text-sm text-muted-foreground">{l.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-12 max-w-2xl text-lg text-muted-foreground">
          Very few companies own every layer of the application stack. Owning all four is what makes
          a long-term architectural bet possible — and what makes it survivable if the bet takes a
          decade.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
        {[
          { k: "Since 1996", d: "Privately held, no outside funding — decisions made on decade horizons, not funding cycles." },
          { k: "Own data centres", d: "Compute, network and runtime operated in-house across multiple regions." },
          { k: "150M+ users served", d: "Zoho's own business applications run on the same infrastructure Catalyst exposes to developers." },
        ].map((f) => (
          <Reveal key={f.k}>
            <div className="h-full bg-background p-8">
              <p className="kicker text-signal">{f.k}</p>
              <p className="mt-4 text-sm text-muted-foreground">{f.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

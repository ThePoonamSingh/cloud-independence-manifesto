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

      {/* Unmissable announcement block */}
      <Reveal>
        <div className="relative z-10">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--signal) 20%, var(--cool) 80%, transparent)",
              filter: "drop-shadow(0 0 10px color-mix(in oklab, var(--signal) 60%, transparent))",
            }}
          />
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8 md:gap-6">
            <span
              className="relative inline-flex items-center gap-3 overflow-hidden px-4 py-2.5 md:px-5 md:py-3"
              style={{
                background: "linear-gradient(100deg, var(--signal) 0%, var(--cool) 100%)",
                boxShadow: "0 0 60px color-mix(in oklab, var(--signal) 35%, transparent)",
              }}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent" style={{ animation: "shimmer-sweep 3.2s ease-in-out infinite" }} />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-background" />
              </span>
              <span className="relative font-mono text-xs font-semibold uppercase tracking-[0.32em] text-background md:text-sm">
                Introducing Catalyst 3.0
              </span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
              A new category of cloud
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h2 className="display relative z-10 mt-10 text-[clamp(3.25rem,11vw,10rem)] leading-[0.92] md:mt-14">
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
        <p className="lede relative z-10 mt-16 text-xl text-muted-foreground md:mt-24 md:text-3xl">
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
            <p className="lede mt-8 text-lg text-muted-foreground md:text-xl">
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
    <Section id="teaching">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl leading-[1.05] md:text-6xl">
          Go from prompt to production.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-2xl md:leading-[1.5]">
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
          <p className="prose-body mt-6 text-muted-foreground">{flow[active]?.d}</p>
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
        <p className="prose-body mt-6 text-muted-foreground">
          Because Zoho builds every layer of the application stack—from cloud infrastructure to
          developer tools and business applications—Catalyst is designed as one integrated system
          that helps developers and AI move from prompt to production without managing infrastructure.
        </p>
        <p className="prose-body mt-4 text-muted-foreground">
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
              <p className="prose-body mt-4 text-sm text-muted-foreground">{p.body}</p>
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




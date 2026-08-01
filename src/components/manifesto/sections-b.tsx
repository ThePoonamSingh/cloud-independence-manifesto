import { useEffect, useState } from "react";
import { Reveal, Section, useReveal } from "./primitives";

/* SECTION 8 — Category */
export function Category() {
  return (
    <Section id="category" kicker="Introducing a new category" className="gradient-section">
      <Reveal delay={100}>
        <h2 className="display text-[clamp(3rem,10vw,9rem)]">Agent-Ready Cloud</h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-16 max-w-3xl text-xl leading-relaxed text-muted-foreground md:mt-24 md:text-3xl md:leading-[1.5]">
          A serverless cloud platform designed for both developers and AI agents, where
          infrastructure, services and platform knowledge are understandable by machines — enabling
          AI to build, deploy and operate production systems with minimal human intervention.
        </p>
        <a
          href="https://catalystagentstack.onslate.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 border border-signal/40 bg-signal-soft px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-signal hover:text-foreground"
        >
          See the Catalyst Agent Stack
          <span className="text-xs">↗</span>
        </a>
      </Reveal>
    </Section>
  );
}

/* SECTION 9 — One system, two builders */
export function TwoBuilders() {
  return (
    <Section id="two-builders">
      <Reveal>
        <h2 className="display max-w-4xl text-4xl md:text-7xl">
          One platform for the human, the agent, and the software they build together.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
          <p>
            The same serverless platform serves two kinds of builders: humans who write intent, and
            agents who turn intent into running systems.
          </p>
          <p>
            Instead of developers and AI using separate toolchains, Catalyst exposes one unified
            surface — SDKs, CLI, MCP and a serverless runtime — that both can understand and
            operate. The human brings intent, the agent brings execution, and the platform handles
            the infrastructure for both.
          </p>
        </div>
      </Reveal>
      <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2">
        {[
          { t: "Human developer", items: ["Intent", "IDE", "Console"], accent: "signal" },
          { t: "AI agent", items: ["Planning", "Agent Skills", "Execution"], accent: "cool" },
        ].map((c) => (
          <Reveal key={c.t}>
            <div className="group relative h-full bg-background p-8 md:p-12">
              <span
                className={`absolute left-0 top-0 h-px w-0 transition-[width] duration-700 group-hover:w-full ${
                  c.accent === "cool" ? "bg-cool" : "bg-signal"
                }`}
              />
              <p className={`kicker ${c.accent === "cool" ? "text-cool" : "text-signal"}`}>
                {c.t}
              </p>
              <ul className="mt-8 space-y-4">
                {c.items.map((i) => (
                  <li key={i} className="text-2xl md:text-3xl">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-12 border border-border p-8 md:p-12">
          <p className="kicker">Shared interfaces</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["MCP", "REST", "SDK", "Agent Skills"].map((s) => (
              <span key={s} className="border border-border px-5 py-2 font-mono text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
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
        <span className="kicker">What's new in Catalyst 3.0</span>
        <h2 className="display mt-10 max-w-3xl text-4xl md:text-7xl">
          Four pillars for the AI era.
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
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

const capabilities = [
  {
    t: "MCP support",
    h: "Connect to any AI model or tool, on an open standard",
    d: "Model Context Protocol support lets your applications talk to AI models and external tools through one open interface, instead of a custom integration for every provider.",
  },
  {
    t: "Signals",
    h: "React to what happens, the moment it happens",
    d: "Signals give applications a live, event-driven nervous system across services — without deploying and managing a messaging layer of your own.",
  },
  {
    t: "Stratus",
    h: "Storage that scales without a storage team",
    d: "Stratus is S3-compatible object storage built into the platform — upload, retrieve, and share files with signed URLs, with no bucket policy to hand-configure.",
  },
  {
    t: "AI-native services",
    h: "Intelligence, built into the platform",
    d: "A new generation of AI-native platform services means intelligence is a capability of Catalyst itself, not a separate system you have to wire in.",
  },
];

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

      <div className="mt-24 border-t border-border pt-16">
        <Reveal>
          <h3 className="display text-3xl md:text-5xl">Capabilities</h3>
          <p className="mt-6 max-w-xl text-muted-foreground">
            New capabilities make it easier to build, connect, deploy, and operate intelligent
            applications — without adding a single extra system to manage.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div className="h-full bg-background p-8 md:p-10">
                <p className="kicker text-signal">{c.t}</p>
                <p className="display mt-5 text-xl md:text-2xl">{c.h}</p>
                <p className="mt-4 text-sm text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
      <Reveal>
        <p className="mt-10 max-w-2xl border-l-2 border-signal pl-5 text-sm text-muted-foreground">
          Proof point: Catalyst is not a greenfield product looking for its first workload. Zoho
          teams ship production applications on it, which means the platform absorbs the same
          operational burden it asks developers to hand over.
        </p>
      </Reveal>
    </Section>
  );
}

import { useEffect, useState } from "react";
import { Reveal, Section, useReveal } from "./primitives";

/* SECTION 8 — Category */
export function Category() {
  return (
    <Section id="category" index="08" kicker="Introducing a new category">
      <Reveal>
        <h2 className="display text-[clamp(3rem,10vw,9rem)]">Agent-Ready Cloud</h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-16 max-w-3xl text-xl leading-relaxed text-muted-foreground md:mt-24 md:text-3xl md:leading-[1.5]">
          A cloud platform designed for both developers and AI agents, where infrastructure,
          services and platform knowledge are understandable by machines — enabling AI to build,
          deploy and operate production systems with minimal human intervention.
        </p>
      </Reveal>
    </Section>
  );
}

/* SECTION 9 — One system, two builders */
export function TwoBuilders() {
  return (
    <Section id="two-builders" index="09" kicker="One system">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-7xl">
          One system. Two kinds of builders.
        </h2>
      </Reveal>
      <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2">
        {[
          { t: "Developer", items: ["Intent", "IDE", "Console"] },
          { t: "AI", items: ["Planning", "Agent Skills", "Execution"] },
        ].map((c) => (
          <Reveal key={c.t}>
            <div className="h-full bg-background p-8 md:p-12">
              <p className="kicker text-signal">{c.t}</p>
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
      <Reveal>
        <p className="display mt-16 text-3xl md:text-5xl">One platform. One architecture.</p>
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
  { t: "Deploys", d: "Environments, secrets and rollout handled by the platform." },
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
    <Section id="teaching" index="10" kicker="Teaching AI how to build">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">
          The platform becomes the teacher.
        </h2>
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
                    ? "border-signal text-foreground"
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
          <p className="kicker text-signal">Step {String(active + 1).padStart(2, "0")}</p>
          <p className="display mt-6 text-3xl md:text-5xl">{flow[active].t}</p>
          <p className="mt-6 text-muted-foreground">{flow[active].d}</p>
        </div>
      </div>
    </Section>
  );
}

/* SECTION 11 — Catalyst 3.0 */
const workflow = ["Idea", "Prompt", "Build", "Deploy", "Scale", "Observe", "Operate"];

export function Catalyst() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Section id="catalyst" index="11" kicker="Catalyst 3.0">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-7xl">
          Everything from prompt to production.
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Not a feature list. One continuous workflow, owned end to end.
        </p>
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
    <Section id="why-zoho" index="12" kicker="Credibility">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">Why Zoho.</h2>
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
    </Section>
  );
}

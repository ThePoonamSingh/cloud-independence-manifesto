import { Reveal, Section } from "./primitives";

export function StartBuilding() {
  return (
    <div className="relative overflow-hidden bg-foreground text-background">
      {/* Background glows */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[60%] w-[60%] rounded-full bg-signal/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[60%] w-[60%] rounded-full bg-cool/10 blur-[120px]"
        aria-hidden="true"
      />

      <Section id="start-building" className="relative z-10">
        <div className="flex flex-col items-start justify-center">
          <Reveal>
            <h2 className="display max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.03em] text-background">
              Free yourself from infrastructure.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-background/70 sm:text-xl md:text-2xl">
              The future belongs to developers who build—not those who manage infrastructure.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-10 space-y-3 font-mono text-sm uppercase tracking-widest text-background/60 sm:text-base">
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-signal" aria-hidden="true" />
                No infrastructure to provision.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-cool" aria-hidden="true" />
                No cloud services to stitch together.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-signal" aria-hidden="true" />
                No deployment complexity to manage.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-8 text-lg font-medium tracking-tight text-background sm:text-xl">
              Just build.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <a
              href="https://catalyst.zoho.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 border border-background bg-background px-8 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:bg-transparent hover:text-background sm:px-10 sm:py-5 sm:text-base"
            >
              Start building with Catalyst 3.0
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </Reveal>

          <Reveal delay={540}>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-background/40">
              Cloud Independence starts with a single deployment.
            </p>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

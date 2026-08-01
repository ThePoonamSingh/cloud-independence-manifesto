import { useEffect, useRef } from "react";

function InfrastructureGraph() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let raf = 0;
    let t = 0;
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-node]"));
    const tick = () => {
      t += 0.006;
      nodes.forEach((n, i) => {
        const phase = t + i * 0.7;
        n.setAttribute("opacity", String(0.25 + 0.6 * Math.abs(Math.sin(phase))));
        n.setAttribute("r", String(1.6 + 1.4 * Math.abs(Math.sin(phase * 0.7))));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cols = 9;
  const rows = 5;
  const pts: Array<{ x: number; y: number }> = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      pts.push({ x: 60 + c * 110, y: 90 + r * 90 + (c % 2 ? 22 : 0) });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1040 540"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
    >
      <g stroke="currentColor" className="text-border" strokeWidth="0.6">
        {pts.map((p, i) => {
          const right = pts[i + 1];
          const down = pts[i + cols];
          return (
            <g key={i}>
              {right && (i + 1) % cols !== 0 && (
                <line x1={p.x} y1={p.y} x2={right.x} y2={right.y} />
              )}
              {down && <line x1={p.x} y1={p.y} x2={down.x} y2={down.y} />}
            </g>
          );
        })}
      </g>
      <g className="text-signal" fill="currentColor">
        {pts.map((p, i) => (
          <circle key={i} data-node cx={p.x} cy={p.y} r="2" />
        ))}
      </g>
      <g
        className="font-mono text-[9px]"
        fill="currentColor"
        style={{ color: "var(--muted-foreground)" }}
      >
        {["const app =", "deploy()", "await agent.build()", "ship", "return app"].map((s, i) => (
          <text key={s} x={120 + i * 190} y={470 - i * 14} opacity={0.5}>
            {s}
          </text>
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <header className="gradient-hero relative flex min-h-screen items-center overflow-hidden">
      <InfrastructureGraph />
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:px-10">
        <h1 className="display mt-8 text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.92]">
          Thebestinfrastructureistheinfrastructuredevelopersneverhavetothinkabout.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-2xl">
          Cloud Independence means building software, not operating infrastructure.
        </p>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href="#declaration"
            className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Read the Manifesto
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href="https://catalyst.zoho.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-border px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Explore Catalyst 3.0
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

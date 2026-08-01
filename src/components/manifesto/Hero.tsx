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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
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
    <header className="gradient-hero relative flex min-h-screen items-center justify-center overflow-hidden">
      <InfrastructureGraph />

      {/* Atmospheric brand glows */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 h-[55%] w-[55%] rounded-full bg-signal/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-0 h-[55%] w-[55%] rounded-full bg-cool/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-32 pb-24 text-center md:px-10">
        {/* Kicker */}
        <div className="mb-12 flex items-center gap-5 opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards]">
          <span className="h-px w-14 bg-gradient-to-r from-transparent via-signal/70 to-signal" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Cloud Independence
          </span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent via-cool/70 to-cool" aria-hidden="true" />
        </div>

        {/* Main headline */}
        <h1 className="max-w-5xl text-[clamp(2rem,7vw,6rem)] font-black leading-[0.92] tracking-[-0.04em] text-foreground opacity-0 animate-[fade-up_1.1s_ease-out_0.5s_forwards]">
          First, developers owned the servers.{" "}
          <span className="block">Then they rented them.</span>{" "}
          <span className="relative inline-block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-foreground/55">
            Now, they shouldn't have to think about them at all.
            <span
              className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-full opacity-35 blur-3xl"
              style={{ background: "linear-gradient(90deg, var(--signal-soft), var(--cool-soft))" }}
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Body hierarchy */}
        <p className="lede mt-12 max-w-3xl text-base text-balance text-muted-foreground opacity-0 animate-[fade-up_1s_ease-out_0.9s_forwards] md:text-xl">
          Cloud Independence is the next era of cloud computing — a future where developers describe what they want to build, and the platform takes care of everything else.
        </p>
      </div>
    </header>
  );
}

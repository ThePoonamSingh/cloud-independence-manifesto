import { useState } from "react";
import { Reveal, Section } from "./primitives";

const options = [
  "Servers",
  "Dockerfiles",
  "Kubernetes YAML",
  "Vendor sprawl",
  "Manual deployments",
  "Infrastructure glue",
  "Proprietary cloud APIs",
  "Egress pricing surprises",
  "IAM role roulette",
  "YAML archaeology",
  "Works on my machine",
  "15-minute deploy cycles",
  "Alert fatigue",
  "Console tab overload",
  "AI-unreadable architecture",
  "Tribal knowledge as docs",
  "Least-privilege drift",
  "Staging that costs like prod",
];

function drawDeclaration(selected: string[], name: string) {
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#111318";
  ctx.fillRect(0, 0, W, H);

  const grad = ctx.createRadialGradient(W / 2, 0, 20, W / 2, 0, 700);
  grad.addColorStop(0, "rgba(230,175,60,0.20)");
  grad.addColorStop(1, "rgba(230,175,60,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.fillStyle = "#e6af3c";
  ctx.font = "500 16px ui-monospace, monospace";
  ctx.fillText("THE CLOUD INDEPENDENCE MANIFESTO", 80, 100);

  ctx.fillStyle = "#f5f5f7";
  ctx.font = "400 64px Georgia, serif";
  ctx.fillText("I declare independence from", 80, 190);

  ctx.font = "400 30px Georgia, serif";
  let y = 260;
  const items = selected.length ? selected : ["infrastructure complexity"];
  items.forEach((s) => {
    ctx.fillStyle = "#e6af3c";
    ctx.fillText("—", 84, y);
    ctx.fillStyle = "#f5f5f7";
    ctx.fillText(s, 130, y);
    y += 48;
  });

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 20px system-ui, sans-serif";
  ctx.fillText(name ? `— ${name}` : "— A developer who builds software, not infrastructure", 80, H - 110);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = "500 14px ui-monospace, monospace";
  ctx.fillText("CATALYST 3.0  ·  AGENT-READY CLOUD", 80, H - 70);

  return canvas.toDataURL("image/png");
}

export function Declaration() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const toggle = (o: string) =>
    setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  const generate = () => setPreview(drawDeclaration(selected, name.trim()));

  return (
    <Section id="declaration" kicker="The declaration">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">I declare Cloud Independence.</h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          From infrastructure glue to vendor lock-in, from alert fatigue to AI-unreadable
          architecture — select every burden you are done carrying. We'll generate a card
          built for LinkedIn.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {options.map((o) => {
              const on = selected.includes(o);
              return (
                <button
                  key={o}
                  onClick={() => toggle(o)}
                  className={`border px-5 py-3 text-sm transition-colors ${
                    on
                      ? "border-signal bg-signal-soft text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mr-3 font-mono text-xs">{on ? "✓" : "□"}</span>
                  {o}
                </button>
              );
            })}
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="mt-6 w-full max-w-sm border border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-signal"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={generate}
              className="border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              Generate my declaration
            </button>
            {preview && (
              <a
                href={preview}
                download="cloud-independence-declaration.png"
                className="border border-border px-6 py-3 text-sm transition-colors hover:border-signal hover:text-signal"
              >
                Download image
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="aspect-[1200/630] w-full border border-border bg-card">
            {preview ? (
              <img
                src={preview}
                alt="Your Cloud Independence declaration card"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
                Your declaration card will appear here.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Closing() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-48">
        <Reveal>
          <h2 className="display text-[clamp(2.75rem,9vw,8rem)]">This is only the beginning.</h2>
        </Reveal>
        <div className="mt-16 max-w-2xl space-y-6 text-lg text-muted-foreground md:text-xl">
          <Reveal delay={100}>
            <p>Every major computing shift required new infrastructure.</p>
          </Reveal>
          <Reveal delay={200}>
            <p>The last decade made developers productive.</p>
          </Reveal>
          <Reveal delay={300}>
            <p>The next decade will make AI productive.</p>
          </Reveal>
          <Reveal delay={400}>
            <p className="text-foreground">Catalyst is building the cloud for that future.</p>
          </Reveal>
        </div>
      </div>
      <div className="h-[45vh] bg-gradient-to-b from-transparent to-black" />
      <footer className="border-t border-border bg-black">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10 md:px-10">
          <p className="kicker">Catalyst 3.0 · The Cloud Independence Manifesto</p>
        </div>
      </footer>
    </section>
  );
}

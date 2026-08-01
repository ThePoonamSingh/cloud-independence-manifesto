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

const RED = "#e32427";
const BLUE = "#216cb4";
const DISPLAY = '"Zoho Puvi", "Work Sans", system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, start: number) {
  let size = start;
  while (size > 12) {
    ctx.font = `400 ${size}px ${DISPLAY}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 1;
  }
  return size;
}

function drawDeclaration(selected: string[], name: string) {
  const W = 1200;
  const H = 627; // LinkedIn share image
  const S = 2; // retina scale
  const canvas = document.createElement("canvas");
  canvas.width = W * S;
  canvas.height = H * S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(S, S);
  ctx.textBaseline = "alphabetic";

  // Base
  ctx.fillStyle = "#0a0b0e";
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = "rgba(255,255,255,0.035)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(W, y + 0.5);
    ctx.stroke();
  }

  // Brand glows
  const red = ctx.createRadialGradient(120, 40, 10, 120, 40, 660);
  red.addColorStop(0, "rgba(227,36,39,0.26)");
  red.addColorStop(1, "rgba(227,36,39,0)");
  ctx.fillStyle = red;
  ctx.fillRect(0, 0, W, H);

  const blue = ctx.createRadialGradient(W - 100, H + 40, 10, W - 100, H + 40, 700);
  blue.addColorStop(0, "rgba(33,108,180,0.26)");
  blue.addColorStop(1, "rgba(33,108,180,0)");
  ctx.fillStyle = blue;
  ctx.fillRect(0, 0, W, H);

  // Vignette
  const vign = ctx.createLinearGradient(0, H * 0.4, 0, H);
  vign.addColorStop(0, "rgba(10,11,14,0)");
  vign.addColorStop(1, "rgba(10,11,14,0.75)");
  ctx.fillStyle = vign;
  ctx.fillRect(0, 0, W, H);

  // Hairline frame
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.strokeRect(36.5, 36.5, W - 73, H - 73);

  // Brand edge accent
  const edge = ctx.createLinearGradient(36, 0, 36, H);
  edge.addColorStop(0, RED);
  edge.addColorStop(1, BLUE);
  ctx.fillStyle = edge;
  ctx.fillRect(36, 36, 3, H - 72);

  const L = 76;
  const R = W - 76;

  // Eyebrow
  ctx.fillStyle = "rgba(255,255,255,0.62)";
  ctx.font = `500 12px ${MONO}`;
  ctx.letterSpacing = "2px";
  ctx.fillText("CLOUD INDEPENDENCE  ·  CATALYST 3.0", L, 90);
  ctx.letterSpacing = "0px";

  // Headline
  const headline = "I declare Cloud Independence.";
  const hSize = fitText(ctx, headline, R - L, 64);
  ctx.fillStyle = "#f7f7f8";
  ctx.font = `400 ${hSize}px ${DISPLAY}`;
  ctx.fillText(headline, L, 158);

  ctx.fillStyle = "rgba(255,255,255,0.50)";
  ctx.font = `400 17px ${DISPLAY}`;
  ctx.fillText("Infrastructure burdens I am done carrying:", L, 194);

  // Burden chips — two columns, vertically filling the card
  const items = (selected.length ? selected : ["Infrastructure complexity"]).slice(0, 12);
  const rows = Math.ceil(items.length / 2);
  const colW = (R - L - 24) / 2;
  const top = 224;
  const available = H - 148 - top;
  const rowH = Math.max(34, Math.min(56, available / rows));
  const chipH = rowH - 10;

  items.forEach((s, i) => {
    const col = Math.floor(i / rows);
    const row = i % rows;
    const x = L + col * (colW + 24);
    const y = top + row * rowH;
    const accent = col === 0 ? RED : BLUE;

    roundRect(ctx, x, y, colW, chipH, 4);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.09)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.fillRect(x, y, 3, chipH);

    // check mark
    const mid = y + chipH / 2;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x + 18, mid);
    ctx.lineTo(x + 22, mid + 4);
    ctx.lineTo(x + 30, mid - 5);
    ctx.stroke();

    let size = Math.min(20, Math.round(chipH * 0.44));
    ctx.font = `400 ${size}px ${DISPLAY}`;
    while (size > 11 && ctx.measureText(s).width > colW - 56) {
      size -= 1;
      ctx.font = `400 ${size}px ${DISPLAY}`;
    }
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(s, x + 42, mid + size * 0.35);
  });

  if (selected.length > 12) {
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.font = `400 14px ${DISPLAY}`;
    ctx.fillText(`+ ${selected.length - 12} more`, L, top + rows * rowH + 12);
  }


  if (selected.length > 10) {
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.font = `400 14px ${DISPLAY}`;
    ctx.fillText(`+ ${selected.length - 10} more`, L, top + rows * rowH + 14);
  }

  // Footer
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(L, H - 116.5);
  ctx.lineTo(R, H - 116.5);
  ctx.stroke();

  const signer = name || "A developer who builds software, not infrastructure";
  const sSize = fitText(ctx, signer, R - L - 220, 26);
  ctx.fillStyle = "#f7f7f8";
  ctx.font = `400 ${sSize}px ${DISPLAY}`;
  ctx.fillText(signer, L, H - 78);

  ctx.fillStyle = "rgba(255,255,255,0.40)";
  ctx.font = `500 12px ${MONO}`;
  ctx.letterSpacing = "1.5px";
  ctx.fillText("SIGNED — BUILD SOFTWARE, NOT INFRASTRUCTURE", L, H - 54);

  // Brand mark right
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = `400 19px ${DISPLAY}`;
  ctx.letterSpacing = "0px";
  ctx.fillText("Catalyst 3.0", R, H - 78);
  ctx.fillStyle = "rgba(255,255,255,0.40)";
  ctx.font = `500 12px ${MONO}`;
  ctx.letterSpacing = "1.5px";
  ctx.fillText("CATALYST.ZOHO.COM", R, H - 54);
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";

  return canvas.toDataURL("image/png");
}

export function Declaration() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const toggle = (o: string) =>
    setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  const generate = async () => {
    setBusy(true);
    try {
      // Ensure Zoho Puvi is available to the canvas before painting.
      if (typeof document !== "undefined" && "fonts" in document) {
        try {
          await Promise.all([
            document.fonts.load('400 64px "Zoho Puvi"'),
            document.fonts.load('400 17px "Zoho Puvi"'),
          ]);
          await document.fonts.ready;
        } catch {
          /* fall back to system fonts */
        }
      }
      setPreview(drawDeclaration(selected, name.trim()));
    } finally {
      setBusy(false);
    }
  };


  return (
    <Section id="declaration" kicker="The declaration" className="gradient-section">
      <Reveal>
        <h2 className="display max-w-3xl text-4xl md:text-6xl">I declare Cloud Independence.</h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Cloud Independence means declaring your own freedom from infrastructure. Choose the
          burdens you refuse to carry into the next decade of software, sign your name, and take
          the declaration with you.
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
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            {selected.length} selected{selected.length > 12 ? " · first 12 appear on the card" : ""}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={generate}
              disabled={busy}
              className="border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-60"
            >
              {busy ? "Signing…" : preview ? "Update my declaration" : "Sign my declaration"}
            </button>
            {preview && (
              <a
                href={preview}
                download="i-declare-cloud-independence.png"
                className="border border-border px-6 py-3 text-sm transition-colors hover:border-signal hover:text-signal"
              >
                Download for LinkedIn (1200×627)
              </a>
            )}
          </div>

        </Reveal>

        <Reveal delay={120}>
          <div className="aspect-[1200/627] w-full border border-border bg-card">
            {preview ? (
              <img
                src={preview}
                alt="Your Cloud Independence declaration card"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
                Your signed declaration will appear here.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}


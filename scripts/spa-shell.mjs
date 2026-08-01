// Fully client-side rendered build: TanStack Start emits the SPA shell as
// dist/client/_shell.html. Copy it to index.html (and 404.html) so dist/client
// can be served by any static host with client-side routing fallback.
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(process.cwd(), "dist/client");
const shell = resolve(dir, "_shell.html");

if (!existsSync(shell)) {
  console.warn("[spa-shell] dist/client/_shell.html not found — skipping.");
  process.exit(0);
}

for (const name of ["index.html", "404.html"]) {
  copyFileSync(shell, resolve(dir, name));
}
console.log("[spa-shell] wrote dist/client/index.html and 404.html");

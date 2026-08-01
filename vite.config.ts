// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

// Static hosts expect dist/client/index.html; the SPA build emits _shell.html.
const spaIndexPlugin = (): Plugin => ({
  name: "spa-index-html",
  apply: "build",
  closeBundle() {
    const shell = resolve(process.cwd(), "dist/client/_shell.html");
    if (existsSync(shell)) {
      copyFileSync(shell, resolve(process.cwd(), "dist/client/index.html"));
    }
  },
});

export default defineConfig({
  // Fully client-rendered SPA: no server runtime, static output in dist/.
  nitro: false,
  plugins: [spaIndexPlugin()],
  tanstackStart: {
    spa: { enabled: true },
    server: { entry: "server" },
  },
});



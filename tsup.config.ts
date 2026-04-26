import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tailwind.preset.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  clean: true,
  external: ["react", "react-dom"],
  // tsup strips "use client" directives from sources during bundling.
  // Components in this lib are React client components, so prepend the
  // directive to every output file. (tailwind.preset.js is consumed by
  // Tailwind in Node where the directive is an inert string literal.)
  banner: { js: '"use client";' },
});

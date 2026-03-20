import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],
  format: ["esm"],
  clean: true,
  minify: true,
  target: "node20",
  banner: {
    js: "#!/usr/bin/env node",
  },
  dts: false,
  sourcemap: false,
});

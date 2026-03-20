import path from "node:path";
import fs from "fs-extra";
import { z } from "zod";

const FRAMEWORKS = ["nextjs", "vite", "remix", "astro", "nuxt", "sveltekit"] as const;

const shippageConfigSchema = z
  .object({
    framework: z.enum(FRAMEWORKS),
    srcDir: z.string().max(256),
    componentsDir: z.string().max(256),
    sectionsDir: z.string().max(256),
    cssPath: z.string().max(256),
    tailwindConfig: z.string().max(256),
    aliases: z.record(z.string().max(256)).default({}),
  })
  .strict();

export type ShippageConfig = z.infer<typeof shippageConfigSchema>;

const DEFAULTS: Record<string, Partial<ShippageConfig>> = {
  nextjs: {
    srcDir: "src",
    componentsDir: "src/components",
    sectionsDir: "src/components/sections",
    cssPath: "src/app/globals.css",
    tailwindConfig: "tailwind.config.ts",
  },
  vite: {
    srcDir: "src",
    componentsDir: "src/components",
    sectionsDir: "src/components/sections",
    cssPath: "src/index.css",
    tailwindConfig: "tailwind.config.ts",
  },
  remix: {
    srcDir: "app",
    componentsDir: "app/components",
    sectionsDir: "app/components/sections",
    cssPath: "app/tailwind.css",
    tailwindConfig: "tailwind.config.ts",
  },
  astro: {
    srcDir: "src",
    componentsDir: "src/components",
    sectionsDir: "src/components/sections",
    cssPath: "src/styles/global.css",
    tailwindConfig: "tailwind.config.mjs",
  },
  nuxt: {
    srcDir: ".",
    componentsDir: "components",
    sectionsDir: "components/sections",
    cssPath: "assets/css/main.css",
    tailwindConfig: "tailwind.config.ts",
  },
  sveltekit: {
    srcDir: "src",
    componentsDir: "src/lib/components",
    sectionsDir: "src/lib/components/sections",
    cssPath: "src/app.css",
    tailwindConfig: "tailwind.config.ts",
  },
};

/**
 * Detect the framework from existing project files.
 */
export async function detectFramework(
  dir: string
): Promise<ShippageConfig["framework"] | null> {
  const checks: [string, ShippageConfig["framework"]][] = [
    ["next.config.js", "nextjs"],
    ["next.config.mjs", "nextjs"],
    ["next.config.ts", "nextjs"],
    ["nuxt.config.ts", "nuxt"],
    ["nuxt.config.js", "nuxt"],
    ["astro.config.mjs", "astro"],
    ["astro.config.ts", "astro"],
    ["svelte.config.js", "sveltekit"],
    ["vite.config.ts", "vite"],
    ["vite.config.js", "vite"],
  ];

  for (const [file, framework] of checks) {
    if (await fs.pathExists(path.join(dir, file))) {
      return framework;
    }
  }
  return null;
}

/**
 * Load the Shippage config from the project directory.
 * Reads shippage.json if it exists, otherwise detects and uses defaults.
 */
export async function getConfig(dir: string): Promise<ShippageConfig | null> {
  const configPath = path.join(dir, "shippage.json");

  if (await fs.pathExists(configPath)) {
    const raw = await fs.readJson(configPath);
    const result = shippageConfigSchema.safeParse(raw);
    if (!result.success) {
      throw new Error(`Invalid shippage.json: ${result.error.issues.map((i) => i.message).join(", ")}`);
    }
    return result.data;
  }

  const framework = await detectFramework(dir);
  if (!framework) return null;

  const defaults = DEFAULTS[framework];
  return {
    framework,
    srcDir: defaults.srcDir ?? "src",
    componentsDir: defaults.componentsDir ?? "src/components",
    sectionsDir: defaults.sectionsDir ?? "src/components/sections",
    cssPath: defaults.cssPath ?? "src/globals.css",
    tailwindConfig: defaults.tailwindConfig ?? "tailwind.config.ts",
    aliases: { "@": defaults.srcDir ?? "src" },
  };
}

/**
 * Ensure a resolved path stays within the target directory.
 * Prevents path traversal attacks from malicious config values.
 */
export function ensureWithinDir(targetDir: string, filePath: string): string {
  const resolved = path.resolve(filePath);
  const resolvedTarget = path.resolve(targetDir);
  if (!resolved.startsWith(resolvedTarget + path.sep) && resolved !== resolvedTarget) {
    throw new Error(
      `Path "${filePath}" resolves outside the project directory. This is not allowed.`
    );
  }
  return resolved;
}

/**
 * Write the config to shippage.json in the project directory.
 */
export async function writeConfig(
  dir: string,
  config: ShippageConfig
): Promise<void> {
  await fs.writeJson(path.join(dir, "shippage.json"), config, { spaces: 2 });
}

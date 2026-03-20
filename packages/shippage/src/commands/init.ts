import path from "node:path";
import fs from "fs-extra";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { execa } from "execa";
import {
  detectFramework,
  writeConfig,
  type ShippageConfig,
} from "../utils/get-config.js";

interface InitOptions {
  dir: string;
  framework?: string;
  vibe?: string;
  yes?: boolean;
}

const VIBES = [
  "minimal-clean",
  "bold-modern",
  "dark-premium",
  "playful-creative",
  "enterprise-trust",
] as const;

const FRAMEWORKS = [
  "nextjs",
  "vite",
  "remix",
  "astro",
  "nuxt",
  "sveltekit",
] as const;

export async function init(options: InitOptions): Promise<void> {
  const targetDir = path.resolve(options.dir);

  p.intro(pc.bgCyan(pc.black(" shippage init ")));

  // Detect or ask for framework
  let framework: ShippageConfig["framework"];
  const detected = await detectFramework(targetDir);

  if (detected) {
    p.log.info(`Detected framework: ${pc.cyan(detected)}`);
    framework = detected;
  } else if (options.framework && FRAMEWORKS.includes(options.framework as any)) {
    framework = options.framework as ShippageConfig["framework"];
  } else if (options.yes) {
    framework = "nextjs";
  } else {
    const answer = await p.select({
      message: "Which framework are you using?",
      options: FRAMEWORKS.map((f) => ({ value: f, label: f })),
    });
    if (p.isCancel(answer)) {
      p.cancel("Init cancelled.");
      process.exit(0);
    }
    framework = answer as ShippageConfig["framework"];
  }

  // Ask for vibe
  let vibe: string;
  if (options.vibe && VIBES.includes(options.vibe as any)) {
    vibe = options.vibe;
  } else if (options.yes) {
    vibe = "minimal-clean";
  } else {
    const answer = await p.select({
      message: "Choose a vibe for your landing page:",
      options: [
        { value: "minimal-clean", label: "Minimal Clean", hint: "Fintech, B2B, Enterprise" },
        { value: "bold-modern", label: "Bold Modern", hint: "SaaS, Startups, Marketing" },
        { value: "dark-premium", label: "Dark Premium", hint: "Dev tools, AI, Infrastructure" },
        { value: "playful-creative", label: "Playful Creative", hint: "Consumer, Design, Education" },
        { value: "enterprise-trust", label: "Enterprise Trust", hint: "Security, Compliance, Healthcare" },
      ],
    });
    if (p.isCancel(answer)) {
      p.cancel("Init cancelled.");
      process.exit(0);
    }
    vibe = answer as string;
  }

  const s = p.spinner();

  // Ensure target directory exists
  await fs.ensureDir(targetDir);

  // Check if shadcn is initialized
  const hasShadcn =
    (await fs.pathExists(path.join(targetDir, "components.json"))) ||
    (await fs.pathExists(path.join(targetDir, "ui.config.ts")));

  if (!hasShadcn) {
    s.start("Initializing shadcn/ui...");
    try {
      await execa("npx", ["shadcn@2.5.0", "init", "-y"], {
        cwd: targetDir,
        stdio: "pipe",
      });
      s.stop("shadcn/ui initialized");
    } catch (error) {
      s.stop(pc.yellow("shadcn/ui init skipped (run manually if needed)"));
      if (error instanceof Error) {
        p.log.warn(`Reason: ${error.message}`);
      }
    }
  } else {
    p.log.info("shadcn/ui already initialized");
  }

  // Install base dependencies
  s.start("Installing dependencies...");
  const deps = ["framer-motion", "lucide-react"];
  const pkgManager = await detectPackageManager(targetDir);

  try {
    if (pkgManager === "pnpm") {
      await execa("pnpm", ["add", "--", ...deps], { cwd: targetDir, stdio: "pipe" });
    } else if (pkgManager === "bun") {
      await execa("bun", ["add", "--", ...deps], { cwd: targetDir, stdio: "pipe" });
    } else if (pkgManager === "yarn") {
      await execa("yarn", ["add", "--", ...deps], { cwd: targetDir, stdio: "pipe" });
    } else {
      await execa("npm", ["install", "--", ...deps], { cwd: targetDir, stdio: "pipe" });
    }
    s.stop("Dependencies installed");
  } catch (error) {
    s.stop(pc.yellow("Dependency install skipped (run manually)"));
    if (error instanceof Error) {
      p.log.warn(`Reason: ${error.message}`);
    }
  }

  // Create sections directory
  const frameworkDefaults: Record<string, { sectionsDir: string; srcDir: string; componentsDir: string; cssPath: string; tailwindConfig: string }> = {
    nextjs: { sectionsDir: "src/components/sections", srcDir: "src", componentsDir: "src/components", cssPath: "src/app/globals.css", tailwindConfig: "tailwind.config.ts" },
    vite: { sectionsDir: "src/components/sections", srcDir: "src", componentsDir: "src/components", cssPath: "src/index.css", tailwindConfig: "tailwind.config.ts" },
    remix: { sectionsDir: "app/components/sections", srcDir: "app", componentsDir: "app/components", cssPath: "app/tailwind.css", tailwindConfig: "tailwind.config.ts" },
    astro: { sectionsDir: "src/components/sections", srcDir: "src", componentsDir: "src/components", cssPath: "src/styles/global.css", tailwindConfig: "tailwind.config.mjs" },
    nuxt: { sectionsDir: "components/sections", srcDir: ".", componentsDir: "components", cssPath: "assets/css/main.css", tailwindConfig: "tailwind.config.ts" },
    sveltekit: { sectionsDir: "src/lib/components/sections", srcDir: "src", componentsDir: "src/lib/components", cssPath: "src/app.css", tailwindConfig: "tailwind.config.ts" },
  };

  const defaults = frameworkDefaults[framework];
  const sectionsDir = path.join(targetDir, defaults.sectionsDir);
  await fs.ensureDir(sectionsDir);

  // Write config
  const config: ShippageConfig = {
    framework,
    srcDir: defaults.srcDir,
    componentsDir: defaults.componentsDir,
    sectionsDir: defaults.sectionsDir,
    cssPath: defaults.cssPath,
    tailwindConfig: defaults.tailwindConfig,
    aliases: { "@": defaults.srcDir },
  };
  await writeConfig(targetDir, config);

  p.log.success(`Created ${pc.cyan("shippage.json")} config`);
  p.log.success(`Sections directory: ${pc.cyan(defaults.sectionsDir)}`);

  p.outro(
    `${pc.green("Shippage initialized!")} Run ${pc.cyan("npx shippage add hero pricing faq cta-footer")} to add sections.`
  );
}

async function detectPackageManager(dir: string): Promise<string> {
  if (await fs.pathExists(path.join(dir, "bun.lockb"))) return "bun";
  if (await fs.pathExists(path.join(dir, "pnpm-lock.yaml"))) return "pnpm";
  if (await fs.pathExists(path.join(dir, "yarn.lock"))) return "yarn";
  return "npm";
}

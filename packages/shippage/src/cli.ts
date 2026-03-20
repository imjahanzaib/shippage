import { Command } from "commander";
import pc from "picocolors";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";

const program = new Command();

program
  .name("shippage")
  .description(
    "A $50K landing page team in your terminal. Conversion-optimized SaaS sections built on shadcn/ui + Magic UI."
  )
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new landing page project or add Shippage to an existing one")
  .option("-d, --dir <path>", "Target directory", ".")
  .option("--framework <name>", "Framework: nextjs, vite, remix, astro", "nextjs")
  .option("--vibe <name>", "Vibe: minimal-clean, bold-modern, dark-premium, playful-creative, enterprise-trust")
  .option("-y, --yes", "Skip prompts, use defaults")
  .action(init);

program
  .command("add")
  .description("Add a section to your project")
  .argument("[sections...]", "Section names to add (e.g. hero pricing faq)")
  .option("-d, --dir <path>", "Target directory", ".")
  .option("--all", "Add all available sections")
  .option("-y, --yes", "Skip prompts, overwrite existing files")
  .action(add);

program
  .command("list")
  .description("List all available sections")
  .action(list);

program.parse();

import pc from "picocolors";
import { SECTIONS } from "../registry/schema.js";

export async function list(): Promise<void> {
  console.log();
  console.log(pc.bold("Available Sections"));
  console.log(pc.dim("─".repeat(70)));
  console.log();

  const categories = new Map<string, typeof SECTIONS>();

  for (const section of SECTIONS) {
    const cat = section.category;
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(section);
  }

  const categoryLabels: Record<string, string> = {
    navigation: "Navigation",
    hero: "Hero",
    trust: "Trust & Social Proof",
    problem: "Problem",
    solution: "Solution",
    proof: "Proof",
    conversion: "Conversion",
    utility: "Utility",
  };

  for (const [cat, items] of categories) {
    console.log(pc.cyan(pc.bold(categoryLabels[cat] ?? cat)));
    for (const item of items) {
      console.log(
        `  ${pc.green(item.name.padEnd(24))} ${pc.dim(item.conversionJob)}`
      );
    }
    console.log();
  }

  console.log(
    pc.dim(`Run ${pc.white("npx shippage add <section>")} to add a section to your project.`)
  );
  console.log();
}

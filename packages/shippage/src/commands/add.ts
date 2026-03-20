import path from "node:path";
import fs from "fs-extra";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { SECTIONS, type SectionMeta } from "../registry/schema.js";
import { getConfig, ensureWithinDir } from "../utils/get-config.js";
import { getSectionSource } from "../registry/sections.js";

interface AddOptions {
  dir: string;
  all?: boolean;
  yes?: boolean;
}

export async function add(
  sections: string[],
  options: AddOptions
): Promise<void> {
  const targetDir = path.resolve(options.dir);

  p.intro(pc.bgCyan(pc.black(" shippage add ")));

  // Load project config
  const config = await getConfig(targetDir);
  if (!config) {
    p.log.error(
      `No Shippage project found in ${pc.cyan(targetDir)}. Run ${pc.cyan("npx shippage init")} first.`
    );
    process.exit(1);
  }

  // Determine which sections to add
  let toAdd: SectionMeta[];

  if (options.all) {
    toAdd = [...SECTIONS];
  } else if (sections.length > 0) {
    toAdd = [];
    for (const name of sections) {
      const meta = SECTIONS.find((s) => s.name === name);
      if (!meta) {
        p.log.warn(`Unknown section: ${pc.yellow(name)}. Skipping.`);
        continue;
      }
      toAdd.push(meta);
    }
  } else {
    // Interactive selection
    const choices = await p.multiselect({
      message: "Which sections do you want to add?",
      options: SECTIONS.map((s) => ({
        value: s.name,
        label: s.name,
        hint: s.conversionJob,
      })),
      required: true,
    });

    if (p.isCancel(choices)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    toAdd = (choices as string[])
      .map((name) => SECTIONS.find((s) => s.name === name)!)
      .filter(Boolean);
  }

  if (toAdd.length === 0) {
    p.log.warn("No sections to add.");
    process.exit(0);
  }

  const sectionsDir = ensureWithinDir(targetDir, path.join(targetDir, config.sectionsDir));
  await fs.ensureDir(sectionsDir);

  const s = p.spinner();
  let added = 0;

  for (const section of toAdd) {
    const fileName = `${section.name}.tsx`;
    const filePath = path.join(sectionsDir, fileName);

    // Check if file already exists
    if ((await fs.pathExists(filePath)) && !options.yes) {
      const overwrite = await p.confirm({
        message: `${pc.yellow(fileName)} already exists. Overwrite?`,
        initialValue: false,
      });
      if (p.isCancel(overwrite) || !overwrite) {
        p.log.info(`Skipped ${pc.dim(section.name)}`);
        continue;
      }
    }

    s.start(`Adding ${pc.cyan(section.name)}...`);

    const source = getSectionSource(section.name, config.framework);
    await fs.writeFile(filePath, source, "utf-8");

    s.stop(`Added ${pc.green(section.name)} → ${pc.dim(fileName)}`);
    added++;
  }

  if (added > 0) {
    p.outro(
      `${pc.green(`${added} section${added > 1 ? "s" : ""} added!`)} Find them in ${pc.cyan(config.sectionsDir)}`
    );
  } else {
    p.outro("No sections were added.");
  }
}

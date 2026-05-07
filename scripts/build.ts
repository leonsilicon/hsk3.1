#!/usr/bin/env bun

import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";

const INPUT_DIR = resolve("data/HSK3.1");
const OUTPUT_DIR = resolve(".");

function toJsonFilename(fileName: string): string {
  const sourceExt = extname(fileName).toLowerCase();
  if (sourceExt === ".json") return fileName;
  return `${basename(fileName, sourceExt)}.json`;
}

function parseTxt(content: string): string[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function typeDefinitionForJson(fileName: string): string {
  if (fileName === "HSK3.1_export.json") {
    return `export interface Hsk31ExportFileSummary {
  name: string;
  size_bytes: number;
  sha256: string;
  content: unknown;
}

export interface Hsk31ExportManifest {
  source_directory: string;
  total_files: number;
  files: Hsk31ExportFileSummary[];
}

declare const data: Hsk31ExportManifest;
export default data;
`;
  }

  return `declare const data: string[];
export default data;
`;
}

async function buildFile(fileName: string): Promise<void> {
  const sourcePath = resolve(INPUT_DIR, fileName);
  const sourceExt = extname(fileName).toLowerCase();

  if (sourceExt === ".pdf" || sourceExt === ".md") {
    return;
  }

  if (sourceExt !== ".txt" && sourceExt !== ".json") {
    console.warn(`Skipping unsupported file: ${fileName}`);
    return;
  }

  const outputPath = resolve(OUTPUT_DIR, toJsonFilename(fileName));
  const raw = await readFile(sourcePath, "utf8");

  let data: unknown;
  if (sourceExt === ".txt") {
    data = parseTxt(raw);
  } else {
    data = JSON.parse(raw);
  }

  const outputFileName = basename(outputPath);

  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await writeFile(`${outputPath}.d.ts`, typeDefinitionForJson(outputFileName), "utf8");
  console.log(`Wrote ${basename(outputPath)} from ${fileName}`);
}

async function main(): Promise<void> {
  const entries = await readdir(INPUT_DIR, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name).sort();

  for (const fileName of files) {
    await buildFile(fileName);
  }
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
  process.exit(1);
});

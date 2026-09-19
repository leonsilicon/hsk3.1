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

/**
 * The official syllabus writes an optional segment of a word in fullwidth parentheses:
 * `没（有）` means "没 or 没有", `有（一）点儿` means "有点儿 or 有一点儿". The `data/` sources keep that
 * notation verbatim, but publishing it as a bare string forces every consumer to re-parse it — and
 * the ones that don't end up treating `（` as if it were a Chinese character. So the published JSON
 * represents such an entry as a tuple of its expansions instead, shortest form first.
 *
 * Only vocabulary entries become tuples. `HSK3.1_chars_original.txt` uses `#` section headers
 * that also contain fullwidth parentheses (`# HSK（一级）认读字`) — those are comments, not words,
 * and are left exactly as they are.
 *
 * Every entry in the current syllabus has at most one optional segment, so two forms is the whole
 * story. An entry with several would need the full 2^n combinations; rather than guess, the build
 * fails on one so this can be revisited deliberately.
 */
const OPTIONAL_SEGMENT = /\uff08[^\uff09]*\uff09/gu;

export type Hsk31Entry = string | string[];

export function expandEntry(entry: string): Hsk31Entry {
  if (entry.startsWith("#")) {
    return entry;
  }

  const withoutOptional = entry.replaceAll(OPTIONAL_SEGMENT, "");
  if (withoutOptional === entry) {
    return entry;
  }

  const segmentCount = entry.match(OPTIONAL_SEGMENT)?.length ?? 0;
  if (segmentCount > 1) {
    throw new Error(
      `Entry "${entry}" has ${segmentCount} optional segments; expandEntry only handles one. ` +
        `Decide how the ${2 ** segmentCount} combinations should be published before building.`,
    );
  }

  const withOptional = entry.replaceAll("\uff08", "").replaceAll("\uff09", "");
  return [withoutOptional, withOptional];
}

function parseTxt(content: string): Hsk31Entry[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => expandEntry(line));
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

  return `declare const data: (string | string[])[];
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

// Guarded so `expandEntry` can be imported (by a test, or to reuse the rule) without rebuilding.
if (import.meta.main) {
  main().catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
    process.exit(1);
  });
}

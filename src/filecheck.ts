import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const IGNORE_FILE_NAME = ".filecheck-ignore.json";

const SOURCE_EXT = /\.tsx?$/;
const TEST_FILE = /\.test\.tsx?$/;
const SKIP_DIRS = new Set(["node_modules", "dist", "coverage"]);

export type FileCheckResult = {
  uncovered: string[];
  missingIgnores: string[];
  redundantIgnores: string[];
  duplicateIgnores: string[];
};

export function repoRoot(fromDir: string = import.meta.dirname): string {
  return path.resolve(fromDir, "..");
}

export function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

export function normalizeIgnorePath(value: string): string {
  return toPosixPath(value).replace(/^\.\//, "");
}

export function isTestFile(filePath: string): boolean {
  return TEST_FILE.test(path.basename(filePath));
}

export function isSourceFile(filePath: string): boolean {
  return SOURCE_EXT.test(path.basename(filePath)) && !isTestFile(filePath);
}

export function companionTestPaths(relativePath: string): readonly [string, string] {
  if (relativePath.endsWith(".tsx")) {
    const stem = relativePath.slice(0, -".tsx".length);
    return [`${stem}.test.ts`, `${stem}.test.tsx`];
  }
  if (relativePath.endsWith(".ts")) {
    const stem = relativePath.slice(0, -".ts".length);
    return [`${stem}.test.ts`, `${stem}.test.tsx`];
  }
  throw new Error(`Not a TypeScript source file: ${relativePath}`);
}

export function hasCompanionTest(root: string, relativePath: string): boolean {
  return companionTestPaths(relativePath).some((file) => existsSync(path.join(root, file)));
}

export function listSourceFiles(root: string): string[] {
  const out: string[] = [];
  walk(root, root, out);
  out.sort();
  return out;
}

function walk(dir: string, root: string, out: string[]): void {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        continue;
      }
      walk(full, root, out);
      continue;
    }
    if (entry.isFile() && isSourceFile(entry.name)) {
      out.push(toPosixPath(path.relative(root, full)));
    }
  }
}

export function loadIgnoreList(raw: unknown): string[] {
  if (!Array.isArray(raw) || raw.some((item) => typeof item !== "string")) {
    throw new Error(`${IGNORE_FILE_NAME} must be a JSON array of strings`);
  }
  return raw.map((item) => normalizeIgnorePath(item));
}

export function readIgnoreList(root: string): string[] {
  const ignorePath = path.join(root, IGNORE_FILE_NAME);
  return loadIgnoreList(JSON.parse(readFileSync(ignorePath, "utf8")));
}

export function checkSourceFiles(
  sources: readonly string[],
  ignoreList: readonly string[],
  hasTest: (relativePath: string) => boolean,
): FileCheckResult {
  const normalizedIgnores = ignoreList.map(normalizeIgnorePath);
  const ignoreSet = new Set(normalizedIgnores);
  const sourceSet = new Set(sources);
  const uncovered = sources.filter((file) => !ignoreSet.has(file) && !hasTest(file));
  const missingIgnores = [...ignoreSet].filter((file) => !sourceSet.has(file)).sort();
  const redundantIgnores = [...ignoreSet].filter((file) => sourceSet.has(file) && hasTest(file)).sort();
  const seen = new Set<string>();
  const duplicateIgnores: string[] = [];
  for (const file of normalizedIgnores) {
    if (seen.has(file)) {
      duplicateIgnores.push(file);
    }
    seen.add(file);
  }
  return { uncovered, missingIgnores, redundantIgnores, duplicateIgnores };
}

export function checkRepo(root: string, ignoreList: readonly string[]): FileCheckResult {
  return checkSourceFiles(listSourceFiles(root), ignoreList, (file) => hasCompanionTest(root, file));
}

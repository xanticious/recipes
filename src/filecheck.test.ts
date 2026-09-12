import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { expect, test } from "vitest";
import {
  checkRepo,
  checkSourceFiles,
  companionTestPaths,
  IGNORE_FILE_NAME,
  isSourceFile,
  isTestFile,
  listSourceFiles,
  loadIgnoreList,
  normalizeIgnorePath,
  readIgnoreList,
  repoRoot,
} from "./filecheck.ts";

test("companion tests sit next to the source file as .test.ts or .test.tsx", () => {
  expect(companionTestPaths("src/data/guide.ts")).toEqual([
    "src/data/guide.test.ts",
    "src/data/guide.test.tsx",
  ]);
  expect(companionTestPaths("src/App.tsx")).toEqual(["src/App.test.ts", "src/App.test.tsx"]);
});

test("test files are not treated as source files", () => {
  expect(isTestFile("src/data/guide.test.ts")).toBe(true);
  expect(isTestFile("src/App.test.tsx")).toBe(true);
  expect(isSourceFile("src/data/guide.test.ts")).toBe(false);
  expect(isSourceFile("src/data/guide.ts")).toBe(true);
  expect(isSourceFile("src/App.tsx")).toBe(true);
});

test("ignore paths drop a leading ./ and use forward slashes", () => {
  expect(normalizeIgnorePath("./src/main.tsx")).toBe("src/main.tsx");
  expect(normalizeIgnorePath("src\\main.tsx")).toBe("src/main.tsx");
});

test("loadIgnoreList requires a JSON array of strings", () => {
  expect(loadIgnoreList(["src/main.tsx", "./src/App.tsx"])).toEqual(["src/main.tsx", "src/App.tsx"]);
  expect(() => loadIgnoreList({ files: [] })).toThrow(/array of strings/);
  expect(() => loadIgnoreList(["src/main.tsx", 1])).toThrow(/array of strings/);
});

test("reports source files that have neither a companion test nor an ignore entry", () => {
  const result = checkSourceFiles(["src/a.ts", "src/b.ts", "src/c.tsx"], ["src/c.tsx"], (file) => {
    return file === "src/a.ts";
  });
  expect(result.uncovered).toEqual(["src/b.ts"]);
  expect(result.missingIgnores).toEqual([]);
  expect(result.redundantIgnores).toEqual([]);
  expect(result.duplicateIgnores).toEqual([]);
});

test("flags ignore entries that are missing, duplicated, or already tested", () => {
  const result = checkSourceFiles(
    ["src/a.ts"],
    ["src/a.ts", "./src/a.ts", "src/gone.ts"],
    () => true,
  );
  expect(result.uncovered).toEqual([]);
  expect(result.redundantIgnores).toEqual(["src/a.ts"]);
  expect(result.missingIgnores).toEqual(["src/gone.ts"]);
  expect(result.duplicateIgnores).toEqual(["src/a.ts"]);
});

test("listSourceFiles skips tests, hidden directories, and node_modules", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "filecheck-"));
  try {
    mkdirSync(path.join(root, "src"));
    mkdirSync(path.join(root, "node_modules", "pkg"), { recursive: true });
    mkdirSync(path.join(root, ".git"));
    mkdirSync(path.join(root, "dist"));
    writeFileSync(path.join(root, "src", "a.ts"), "");
    writeFileSync(path.join(root, "src", "a.test.ts"), "");
    writeFileSync(path.join(root, "src", "b.tsx"), "");
    writeFileSync(path.join(root, "src", "b.test.tsx"), "");
    writeFileSync(path.join(root, "node_modules", "pkg", "x.ts"), "");
    writeFileSync(path.join(root, ".git", "hidden.ts"), "");
    writeFileSync(path.join(root, "dist", "out.ts"), "");
    writeFileSync(path.join(root, "vite.config.ts"), "");
    expect(listSourceFiles(root)).toEqual(["src/a.ts", "src/b.tsx", "vite.config.ts"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("every TypeScript source file has a companion unit test or an ignore entry", () => {
  const root = repoRoot();
  const ignorePath = path.join(root, IGNORE_FILE_NAME);
  expect(existsSync(ignorePath)).toBe(true);
  const ignore = readIgnoreList(root);
  const result = checkRepo(root, ignore);
  expect(result.duplicateIgnores).toEqual([]);
  expect(result.missingIgnores).toEqual([]);
  expect(result.redundantIgnores).toEqual([]);
  expect(result.uncovered).toEqual([]);
});

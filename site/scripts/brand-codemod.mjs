#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import { dirname, relative } from "node:path";
import { readdirSync, statSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const repoRoot = dirname(__dirname);
const dryRun = process.argv.includes("--dry");

function collectFiles(dir, list = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = `${dir}/${entry}`;
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      collectFiles(fullPath, list);
    } else if (stats.isFile() && /\.(ts|tsx|js|jsx|css)$/.test(entry)) {
      list.push(fullPath);
    }
  }
  return list;
}

const files = collectFiles(`${repoRoot}/src`);

console.log(`brand:codemod (${dryRun ? "dry-run" : "apply"})`);
console.log(`Scanned ${files.length} candidate files. No replacements executed in stub codemod.`);
console.log("Review summary:");
console.log(" - 0 replacements performed");
console.log(" - 0 files modified");
console.log("Extend this script to map legacy colors to brand tokens when ready.");

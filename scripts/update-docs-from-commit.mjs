#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// --- config (edit paths/titles if you want) ---
const filesToUpdate = [
  { path: "docs/PRD.md", sectionHeading: "## Changelog" },
  { path: "docs/Developer-Handoff.md", sectionHeading: "## Changelog" },
];

// Only log these types into the changelog
const allowedTypes = new Set(["feat", "fix", "perf", "refactor", "docs", "chore", "build", "ci", "style", "test", "revert"]);

// --- read last commit ---
const subject = execSync('git log -1 --pretty=%s').toString().trim(); // e.g. "feat(footer): add donate link"
const body = execSync('git log -1 --pretty=%b').toString().trim();     // optional long body
const hash = execSync('git rev-parse --short HEAD').toString().trim();
const date = new Date().toISOString().slice(0, 10);

// Parse type(scope): desc
const match = subject.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/);
if (!match) {
  // Not conventional: skip quietly
  process.exit(0);
}
const [, type, scope = "", desc] = match;
if (!allowedTypes.has(type)) process.exit(0);

const bullet = `- ${date} — **${type}${scope ? `(${scope})` : ""}**: ${desc} (${hash})` + (body ? `\n  \n  ${body.replace(/\r?\n/g, "\n  ")}` : "");

// --- helper to ensure changelog header exists and append entry above older items ---
function updateFile(relPath, heading) {
  const filePath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes(heading)) {
    // Create the section at the end
    content = `${content.trim()}\n\n${heading}\n\n`;
  }

  // Insert bullet right after heading (newest first)
  const parts = content.split(heading);
  if (parts.length < 2) return;

  const before = parts[0];
  const after = parts.slice(1).join(heading); // in case heading appears more than once, join back
  const updated = `${before}${heading}\n${bullet}\n${after.replace(/^\n*/, "\n")}`;

  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`Updated ${relPath} changelog with: ${subject}`);
}

for (const f of filesToUpdate) updateFile(f.path, f.sectionHeading);

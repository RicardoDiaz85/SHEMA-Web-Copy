#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DOCS = ["docs/PRD.md", "docs/Developer-Handoff.md"];
const HEADER = "## Changelog";
const HEADER_HINT = "*(Newest entries first)*";

function sh(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

function ensureChangelogHeader(text) {
  if (
    text.includes(`\n${HEADER}\n`) ||
    text.startsWith(`${HEADER}\n`) ||
    text.includes(`\r\n${HEADER}\r\n`)
  )
    return text;
  const prefix = `${HEADER}\n${HEADER_HINT}\n\n`;
  return prefix + text;
}

function insertEntry(text, entry) {
  const idx = text.indexOf(HEADER);
  if (idx === -1) return text;
  const afterHeaderIdx = text.indexOf("\n", idx + HEADER.length);
  let insertPos = afterHeaderIdx + 1;
  const maybeHintIdx = text.indexOf(HEADER_HINT, insertPos);
  if (maybeHintIdx === insertPos) {
    const afterHint = text.indexOf("\n", maybeHintIdx + HEADER_HINT.length);
    insertPos = afterHint + 1;
  }
  return text.slice(0, insertPos) + entry + "\n" + text.slice(insertPos);
}

function main() {
  const hash = sh("git rev-parse HEAD");
  const date =
    sh("git log -1 --date=short --pretty=format:%cd") ||
    new Date().toISOString().slice(0, 10);
  const subject = sh("git log -1 --pretty=format:%s") || "Update";
  const bodyRaw = sh("git log -1 --pretty=format:%b");
  const body =
    (bodyRaw || "")
      .split(/\r?\n\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)[0] || "No additional notes.";
  const changed = sh("git diff --name-status HEAD~1..HEAD");

  if (!hash) process.exit(0);

  const entryLines = [];
  entryLines.push(`### ${date} — ${subject}`);
  entryLines.push(`- Commit: ${hash}`);
  if (changed) {
    entryLines.push(`- Files changed:`);
    for (const line of changed.split(/\r?\n/)) {
      if (!line.trim()) continue;
      entryLines.push(`  - ${line}`);
    }
  }
  entryLines.push(`- Notes:`);
  entryLines.push(`  ${body}`);
  const entry = entryLines.join("\n") + "\n";

  for (const doc of DOCS) {
    if (!existsSync(doc)) continue;
    let text = readFileSync(doc, "utf8");
    if (new RegExp(`\\b${hash}\\b`).test(text)) continue;
    const ensured = ensureChangelogHeader(text);
    const updated = insertEntry(ensured, entry);
    if (updated !== text) {
      writeFileSync(doc, updated.replace(/\r\n/g, "\n"), "utf8");
    }
  }
}

main();


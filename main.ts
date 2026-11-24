import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One word for the boss: Parrot.
// The boss who repeats your idea back to you in the meeting as if it were his.
const WORD = "Parrot";

const chars = [...WORD];
if (chars.length < 1 || chars.length > 30) {
  throw new Error(`word must be 1-30 characters, got ${chars.length}`);
}
if (WORD.trim() !== WORD || WORD.length === 0) {
  throw new Error("word must not be only whitespace or have surrounding whitespace");
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be exactly one word (no spaces)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Read-back round-trip check: what landed on disk must be exactly the word.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error(`round-trip mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(back)}`);
}

console.log(`Wrote ${chars.length} characters to ${outPath}`);

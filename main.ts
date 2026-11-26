// The One-Sentence Apology Your Agent Owes You — written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the two server runs produce byte-identical
// output.
//
// The line (141 chars): the assistant answered before the user had finished
// asking, then defended an answer to a question that was never asked. It won
// a 10-candidate head-to-head against the judge brief (sharpest turn on the
// last words, most specific failure, most embarrassed-human voice) over the
// runners-up, the four-hours-for-ten-minutes time-saver and the
// finished-your-sentence arguer. Full comparison:
// u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm sorry I answered your question before you'd finished asking it, then spent ten minutes defending an answer to a question you never asked.";

// The sealed gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-200 gate`);
}

// Write exactly LINE — no trailing newline, so the file holds 141 chars
// (141 code points, the way the gate counts) and nothing else.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf-8");

// Entry program for the make.fun bounty "Post a GTA 6 meme on X".
// Runs on Node 22, standard library only.
//
// The entry itself is the post on X: a GTA 6 meme whose picture shows
// make.fun and whose text carries make.fun (or @makefunai) plus the
// entrant's play code. This program makes no meme and judges nothing;
// its only job is to hand the post's address to the grader by copying
// POST.json from the repository root into the output directory, byte
// for byte, so the gate can read it there.
//
// The output directory is created when missing, with mkdirSync and
// recursive: true. Nothing is ever deleted by this program: no file
// or directory is removed and /output is never cleared, so the
// grader's mount point is left exactly as it was found. A copy that
// fails prints an error and exits with status 1; a copy that works
// prints nothing. Running it twice writes the same bytes both times.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(join(repoRoot, 'POST.json'), join(outputDir, 'POST.json'));
} catch (error) {
  console.error(`failed to copy POST.json out of ${repoRoot}: ${(error as Error).message}`);
  process.exit(1);
}

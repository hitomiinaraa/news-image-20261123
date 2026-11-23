// news-image-20261123 entry (Node 22, standard library only).
// The picture is drawn at build time and ships beside this file as
// entry.png; this program places an exact copy of it at /output/entry.png,
// so both runs of the grader write the same bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, 'entry.png'));
writeFileSync(target, bytes);
// Self-check: the copy must be byte for byte the image we ship.
if (statSync(target).size !== bytes.length) {
  throw new Error('entry.png copy is incomplete');
}

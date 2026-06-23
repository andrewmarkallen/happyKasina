import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

const assertMatch = (pattern, message) => {
  assert.match(html, pattern, message);
};

assertMatch(
  /const\s+resolveKasinaKind\s*=/,
  'visual state should expose a shared resolveKasinaKind helper'
);

assertMatch(
  /value:\s*'candle'[\s\S]*name:\s*'Candle'|name:\s*'Candle'[\s\S]*value:\s*'candle'/,
  'settings choices should include a Candle option'
);

assertMatch(
  /value:\s*'fire'[\s\S]*name:\s*'Fire'|name:\s*'Fire'[\s\S]*value:\s*'fire'/,
  'settings choices should include a Fire option'
);

assertMatch(
  /name:\s*'White'[\s\S]*name:\s*'Candle'/,
  'Candle should appear immediately after White in the kasina choices'
);

assertMatch(
  /name:\s*'Candle'[\s\S]*name:\s*'Fire'/,
  'Fire should appear as the sixth kasina choice after Candle'
);

assertMatch(
  /setParam\(sp,\s*'kasina'/,
  'permalink/apply collection should write the kasina URL parameter'
);

assertMatch(
  /delete\('kasina'\)/,
  'disk selections should omit the kasina parameter for backward-compatible URLs'
);

assertMatch(
  /createCandleKasina/,
  'Three.js renderer should have a candle visual factory'
);

assertMatch(
  /createFireKasina/,
  'Three.js renderer should have a fire visual factory'
);

assertMatch(
  /createFireLineMaterial/,
  'Three.js renderer should expose the fire-line shader material'
);

assertMatch(
  /uTime\s*\*\s*uMotion/,
  'Fire shader should respect disabled visual motion'
);

assertMatch(
  /data-kasina/,
  'CSS fallback should be keyed by kasina kind'
);

assertMatch(
  /fire-scene/,
  'CSS fallback should include a fire kasina structure'
);

assertMatch(
  /@keyframes\s+fireKasinaDrift/,
  'CSS fallback should define bounded fire drift animation'
);

assertMatch(
  /kasinaKind\s*===\s*'fire'[\s\S]*visualObject\.scale\.set\(radius,\s*radius,\s*1\)/,
  'Three.js fire renderer should scale to the same diameter as the disks'
);

assertMatch(
  /candle-wick/,
  'CSS fallback should include a calm wick/flame structure'
);

assertMatch(
  /const\s+resolveCandleFlicker\s*=/,
  'visual state should expose a resolveCandleFlicker helper'
);

assertMatch(
  /candle-body/,
  'CSS fallback should include a dimensional candle body'
);

assertMatch(
  /candle-top/,
  'CSS fallback should include a visible wax top'
);

assertMatch(
  /@keyframes\s+candleFlameFlicker/,
  'CSS fallback should define a bounded candle flicker animation'
);

assertMatch(
  /prefers-reduced-motion:\s*reduce[\s\S]*\.candle-flame[\s\S]*animation:\s*none/,
  'CSS flicker should be disabled for reduced-motion users'
);

assertMatch(
  /createCandleBody/,
  'Three.js candle renderer should build a dimensional wax body'
);

assertMatch(
  /createCandleTop/,
  'Three.js candle renderer should build a curved wax top'
);

assertMatch(
  /PointLight/,
  'Three.js candle renderer should include bounded warm flame light'
);

assertMatch(
  /animatedLights/,
  'Three.js render loop should animate candle light separately from shader materials'
);

assertMatch(
  /uFlicker/,
  'Three.js flame shader should expose a bounded flicker uniform'
);

assertMatch(
  /uFlicker\s*\*\s*0\.05/,
  'Three.js flame shader should use a visible horizontal flicker contribution'
);

assertMatch(
  /uFlicker\s*\*\s*0\.065/,
  'Three.js flame shader should use visible height breathing'
);

assertMatch(
  /uFlicker\s*\*\s*0\.12/,
  'Three.js flame shader should use visible alpha modulation'
);

assertMatch(
  /uBrightness\.value\s*=\s*1\.0\s*\+\s*flicker\s*\*\s*0\.12/,
  'Three.js render loop should use visible brightness modulation'
);

assertMatch(
  /light\.intensity\s*=\s*1\.05\s*\+\s*flicker\s*\*\s*0\.22/,
  'Three.js candle light should use visible intensity modulation'
);

assertMatch(
  /light\.position\.x\s*=\s*flicker\s*\*\s*0\.045/,
  'Three.js candle light should visibly track flame drift'
);

assertMatch(
  /calc\(-50%\s*\+\s*4px\)/,
  'CSS fallback should use visible positive lateral flame drift'
);

assertMatch(
  /calc\(-50%\s*-\s*3px\)/,
  'CSS fallback should use visible negative lateral flame drift'
);

assertMatch(
  /opacity:\s*0\.78/,
  'CSS fallback should include a visibly dimmer flame keyframe'
);

assertMatch(
  /opacity:\s*0\.96/,
  'CSS fallback should include a visibly brighter flame keyframe'
);

console.log('candle-kasina structural checks passed');

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
  /function\s+activateAudio\(\)[\s\S]*ctx\.resume\(\)[\s\S]*\.then\(/,
  'audio activation should wait for AudioContext.resume() to complete'
);

assertMatch(
  /ctx\.state\s*!==\s*'suspended'\s*&&\s*ctx\.state\s*!==\s*'interrupted'/,
  'audio activation should permit a user-initiated retry from the interrupted state'
);

assertMatch(
  /audioCtx\.addEventListener\('statechange'[\s\S]*audioCtx\.state\s*===\s*'interrupted'/,
  'audio lifecycle should observe external mobile audio interruptions'
);

assertMatch(
  /function\s+startSequence\(\)[\s\S]*activateAudio\(\)[\s\S]*\.then\([\s\S]*ensureReverb\(ctx,\s*currentWetChain\)/,
  'the timer should only enter its lead-in after audio activation succeeds'
);

assertMatch(
  /function\s+previewPresetGong[\s\S]*activateAudio\(\)[\s\S]*triggerPresetGong\(ctx,/,
  'gong previews should wait for audio activation'
);

assertMatch(
  /function\s+previewBell[\s\S]*activateAudio\(\)[\s\S]*playFMBell\(ctx,/,
  'bell previews should wait for audio activation'
);

assertMatch(
  /let\s+running\s*=\s*false,\s*audioStarting\s*=\s*false,\s*sequenceRequest\s*=/,
  'timer activation should track pending starts to prevent duplicate sessions'
);

assert.doesNotMatch(
  html,
  /function\s+ensureCtx\(/,
  'audio context activation should not use the former fire-and-forget helper'
);

console.log('audio lifecycle structural checks passed');

import assert from 'node:assert/strict';
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
const root = fileURLToPath(new URL('../', import.meta.url));
const inventory = JSON.parse(readFileSync(new URL('../qa/architecture-paths.json', import.meta.url)));
function validate(data) {
  assert.deepEqual(Object.keys(data).sort(), ['paths', 'repo', 'schema_version']);
  assert.equal(data.schema_version, 1);
  assert.equal(data.repo, 'github.com/KyaniteLabs/kinocut-site');
  assert.ok(Array.isArray(data.paths) && data.paths.length > 0);
  const patterns = new Set();
  for (const entry of data.paths) {
    assert.deepEqual(Object.keys(entry).sort(), ['layer', 'owner', 'pattern']);
    assert.ok(typeof entry.pattern === 'string' && !entry.pattern.startsWith('/') && !entry.pattern.includes('..'));
    assert.ok(!patterns.has(entry.pattern)); patterns.add(entry.pattern);
    assert.ok(typeof entry.layer === 'string' && entry.layer.trim());
    assert.ok(['engineering', 'product'].includes(entry.owner));
    assert.ok(globSync(entry.pattern, { cwd: root }).length > 0, `unmatched: ${entry.pattern}`);
  }
}
test('architecture inventory matches source and literal forge identity', () => validate(inventory));
test('inventory rejects empty, wrong-identity and unmatched policies', () => {
  assert.throws(() => validate({ ...inventory, paths: [] }));
  assert.throws(() => validate({ ...inventory, repo: 'KyaniteLabs/kinocut-site' }));
  assert.throws(() => validate({ ...inventory, paths: [{ pattern: 'nonexistent/**', layer: 'test', owner: 'engineering' }] }));
});

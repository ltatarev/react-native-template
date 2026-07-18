import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  encoding: 'utf8',
  env: {
    ...process.env,
    npm_config_cache: join(tmpdir(), 'react-native-template-npm-cache'),
  },
});

assert.equal(result.status, 0, result.stderr);

const [packageDetails] = JSON.parse(result.stdout);
const packagedPaths = new Set(packageDetails.files.map(file => file.path));

for (const requiredPath of [
  'template/_gitignore',
  'template/.vscode/settings.json',
]) {
  assert.ok(
    packagedPaths.has(requiredPath),
    `The package must ship ${requiredPath}`,
  );
}

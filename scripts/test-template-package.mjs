import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
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
  // Skills only carry over to a generated app if they are inside the tarball.
  'template/skills-lock.json',
  'template/.claude/settings.json',
  'template/.claude/skills/add-feature/SKILL.md',
  'template/.claude/skills/build-ui/SKILL.md',
  'template/.claude/skills/validate-change/SKILL.md',
  'template/.claude/skills/rozenite-agent/SKILL.md',
]) {
  assert.ok(
    packagedPaths.has(requiredPath),
    `The package must ship ${requiredPath}`,
  );
}

// Every vendored skill needs a lock entry, or `npx skills update` silently
// skips it and the copy rots.
const lock = JSON.parse(
  readFileSync(new URL('../template/skills-lock.json', import.meta.url), 'utf8'),
);
const lockedSkills = new Set(Object.keys(lock.skills));
const vendoredSkills = readdirSync(
  new URL('../template/.claude/skills', import.meta.url),
);

for (const skill of vendoredSkills) {
  assert.ok(
    lockedSkills.has(skill),
    `Vendored skill ${skill} is missing from template/skills-lock.json`,
  );
}

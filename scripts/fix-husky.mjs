#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();
const huskyDir = path.join(repoRoot, '.husky');
const keepHooks = ['pre-commit', 'commit-msg', 'post-commit'];
const summary = { hooksEnabled: [], hooksDisabled: [], huskyInstalled: false, hooksPathSet: false };

function run(cmd, args, options = {}) {
  return spawnSync(cmd, args, { stdio: 'inherit', ...options });
}

// Ensure git hooksPath
const hooksPath = spawnSync('git', ['config', '--get', 'core.hooksPath'], { encoding: 'utf8' });
if (hooksPath.stdout.trim() !== '.husky') {
  run('git', ['config', 'core.hooksPath', '.husky']);
  summary.hooksPathSet = true;
}

// Ensure husky.sh exists
try {
  await fs.access(path.join(huskyDir, '_/husky.sh'));
} catch {
  run('npx', ['husky', 'install']);
  summary.huskyInstalled = true;
  try {
    await fs.access(path.join(huskyDir, '_/husky.sh'));
  } catch {
    await fs.mkdir(path.join(huskyDir, '_'), { recursive: true });
    const shim = `#!/usr/bin/env sh\nif [ -z "$husky_skip_init" ]; then\n  debug () {\n    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"\n  }\n  readonly hook_name="$(basename "$0")"\n  debug "starting $hook_name..."\n  if [ "$HUSKY" = "0" ]; then\n    debug "HUSKY env variable is set to 0, skipping hook"\n    exit 0\n  fi\n  if [ -f ~/.huskyrc ]; then\n    debug "sourcing ~/.huskyrc"\n    . ~/.huskyrc\n  fi\n  export readonly husky_skip_init=1\n  sh -e "$0" "$@"\n  exitCode=$?\n  unset husky_skip_init\n  exit $exitCode\nfi\n`;
    await fs.writeFile(path.join(huskyDir, '_/husky.sh'), shim, { encoding: 'utf8' });
    await fs.chmod(path.join(huskyDir, '_/husky.sh'), 0o755);
  }
}

const header = '#!/usr/bin/env sh\n. "$(dirname "$0")/_/husky.sh"\n\n';

async function ensureHook(name, defaultBody) {
  const filePath = path.join(huskyDir, name);
  let body = '';
  try {
    const existing = await fs.readFile(filePath, 'utf8');
    const existingBody = existing.split(/\r?\n/).slice(2).join('\n').trim();
    if (existingBody) body = existingBody + '\n';
  } catch {
    // file does not exist
  }
  if (!body) body = defaultBody + '\n';
  await fs.writeFile(filePath, header + body, { encoding: 'utf8' });
  await fs.chmod(filePath, 0o755);
  summary.hooksEnabled.push(name);
}

// Determine commitlint config
const commitlintConfigs = [
  '.commitlintrc',
  '.commitlintrc.js',
  '.commitlintrc.cjs',
  '.commitlintrc.json',
  '.commitlintrc.yml',
  '.commitlintrc.yaml',
  'commitlint.config.js',
  'commitlint.config.cjs',
  'commitlint.config.mjs'
];
let hasCommitlint = false;
for (const cfg of commitlintConfigs) {
  try {
    await fs.access(path.join(repoRoot, cfg));
    hasCommitlint = true;
    break;
  } catch {}
}

await ensureHook('pre-commit', 'exit 0');
await ensureHook('commit-msg', hasCommitlint ? 'npx --yes commitlint --edit "$1"' : 'exit 0');
await ensureHook('post-commit', 'if command -v node >/dev/null 2>&1; then\n  node scripts/update-docs-from-commit.mjs || true\nfi');

// Disable other hooks
const entries = await fs.readdir(huskyDir);
for (const entry of entries) {
  if (entry === '_' || keepHooks.includes(entry)) continue;
  const filePath = path.join(huskyDir, entry);
  const stat = await fs.stat(filePath);
  if (stat.isFile()) {
    await fs.writeFile(filePath, '# disabled\n');
    await fs.chmod(filePath, 0o644);
    summary.hooksDisabled.push(entry);
  }
}

console.log('husky fix summary:');
if (summary.hooksPathSet) console.log('- set git hooksPath to .husky');
if (summary.huskyInstalled) console.log('- installed husky');
console.log('- enabled hooks: ' + (summary.hooksEnabled.join(', ') || 'none'));
console.log('- disabled hooks: ' + (summary.hooksDisabled.join(', ') || 'none'));

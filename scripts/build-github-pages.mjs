import { existsSync, renameSync, rmdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/').at(-1) ?? 'EclipseCountdown';

const build = spawnSync(
  process.execPath,
  [join('node_modules', 'vinext', 'dist', 'cli.js'), 'build'],
  {
    cwd: process.cwd(),
    env: { ...process.env, GITHUB_PAGES: 'true' },
    stdio: 'inherit',
  },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const clientDirectory = join('dist', 'client');
const prefixedDirectory = join(clientDirectory, repositoryName);
const prefixedNextDirectory = join(prefixedDirectory, '_next');
const rootNextDirectory = join(clientDirectory, '_next');

if (!existsSync(prefixedNextDirectory)) {
  throw new Error(`Expected static assets at ${prefixedNextDirectory}`);
}

if (existsSync(rootNextDirectory)) {
  throw new Error(`Refusing to overwrite existing assets at ${rootNextDirectory}`);
}

renameSync(prefixedNextDirectory, rootNextDirectory);
rmdirSync(prefixedDirectory);
writeFileSync(join(clientDirectory, '.nojekyll'), '');

console.log(`GitHub Pages artifact ready in ${clientDirectory}`);

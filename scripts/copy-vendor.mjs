// Copia los archivos de las dependencias del navegador (instaladas con pnpm)
// a public/assets/. Se ejecuta solo en cada `pnpm install` (postinstall) y
// con `pnpm vendor`. Los archivos copiados no se versionan (.gitignore).
import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, 'public', 'assets');

const bootstrap = dirname(require.resolve('bootstrap/package.json'));
const { version } = require('bootstrap/package.json');

const files = [
  ['dist/css/bootstrap.min.css', 'css/bootstrap.min.css'],
  ['dist/css/bootstrap.min.css.map', 'css/bootstrap.min.css.map'],
  ['dist/js/bootstrap.bundle.min.js', 'js/bootstrap.bundle.min.js'],
  ['dist/js/bootstrap.bundle.min.js.map', 'js/bootstrap.bundle.min.js.map'],
  ['LICENSE', 'bootstrap-LICENSE.txt'],
];

for (const [from, to] of files) {
  const target = join(assets, to);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(bootstrap, from), target);
}

console.log(`Bootstrap ${version} copiado a public/assets/ (${files.length} archivos)`);

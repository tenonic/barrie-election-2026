// Windows Smart App Control on the owner's PC blocks Astro's native compiler
// (.node file). Astro falls back to its WebAssembly build when the native one
// fails to load, but npm skips that package because of its "wasm32" cpu tag.
// This installs it (unsaved) on Windows so local dev and builds work.
// GitHub Actions runs on Linux and uses the native compiler, so it skips this.
import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

if (process.platform === 'win32' && !existsSync('node_modules/@astrojs/compiler-binding-wasm32-wasi/package.json')) {
  const { version } = JSON.parse(readFileSync('node_modules/@astrojs/compiler-binding/package.json', 'utf8'));
  console.log(`Installing Astro's WebAssembly compiler ${version} for Windows...`);
  execSync(`npm install --no-save --force @astrojs/compiler-binding-wasm32-wasi@${version}`, { stdio: 'inherit' });
}

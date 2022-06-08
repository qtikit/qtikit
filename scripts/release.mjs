import {spawnSync as spawn} from 'child_process';

const ROOT = './.release/@qtikit';
const PACKAGES = ['mathjax-react', 'model', 'react', 'scoring-engine'];
const zipName = `@qtikit-${process.argv[2] ? `${process.argv[2]}` : ''}.zip`;
const dest = process.argv[3];

spawn('rm -rf ./.release', [], {shell: true, stdio: 'inherit'});

for (const packageName of PACKAGES) {
  const src = `./packages/${packageName}/lib`;
  const target = `${ROOT}/${packageName}`;
  spawn('mkdir', [`-p`, target], {stdio: 'inherit'});
  spawn('cp', ['-r', src, target], {stdio: 'inherit'});
}

spawn(`cd .release/ && zip -r -q ${zipName} * && cd - > /dev/null`, [], {shell: true, stdio: 'inherit'});

console.log(`${zipName} created`);

if (dest) {
  spawn(`cp ./.release/${zipName} ${dest}`, [], {shell: true, stdio: 'inherit'});
  console.log(`${zipName} copied to ${dest}`);
}

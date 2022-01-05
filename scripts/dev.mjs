import {spawnSync as spawn} from 'child_process';

const jobs = [
  ['yarn', 'clean-build'],
  ['node', './examples/index.js'],
];

for (const job of jobs) {
  spawn(job[0], [job[1]], {stdio: 'inherit'});
}

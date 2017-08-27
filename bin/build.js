#! /usr/bin/env node
const shell = require('shelljs');

const command = [
  'npx babel app.js --out-file index.js',
  'npx babel src --out-dir lib',
  'npx babel bin --ignore build --out-dir bin/build',
];

shell
  .exec(`${command.join(' && ')}`);

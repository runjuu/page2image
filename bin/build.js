#! /usr/bin/env node
const shell = require('shelljs');

const babel = 'node_modules/.bin/babel';
const command = [
  `${babel} app.js --out-file index.js`,
  `${babel} src --out-dir lib`,
  `${babel} bin --ignore build --out-dir buildBin`,
];

shell
  .exec(`${command.join(' && ')}`);

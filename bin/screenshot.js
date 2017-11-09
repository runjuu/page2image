#! /usr/bin/env node
/* eslint-disable no-console */

const path = require('path');
const args = require('args-parser')(process.argv);
const packageInfo = require('../package.json');
const { default: Screenshot } = require('../');

const isUrl = url => /[^\w]/g.test(url);
const urls = Object.keys(args).filter(key => isUrl(key));
const {
  width = 1366,
  height,
  type = 'png',
  quality = 100,
  dpr: deviceScaleFactor = 2,
  emulate: emulateConfig,
  waitUntil = 'networkidle',
  disableJS = false,
  scrollToBottom,
  sleep,
  named,
  version,
  V,
} = args;

if (version || V) console.log(packageInfo.version);

function fileName(url) {
  let name = `${url.replace(/http[^/]+\/\//, '').replace(/\//g, '_').replace(/\?.*/, '')}.${type}`;

  if (!fileName.count) fileName.count = 0;
  if (named && named !== true) name = `${named}${fileName.count > 0 ? `_${fileName.count}` : ''}.${type}`;

  fileName.count += 1;
  return name;
}

function isValidLocalPath(localPath) {
  return localPath.replace(/\./g, '').indexOf('/') === 0;
}

async function takeAllScreenshot(screenshot) {
  let url = urls.shift();
  try {
    if (typeof url === 'string') {
      if (isValidLocalPath(url)) {
        url = `file://${path.isAbsolute(url) ? url : path.resolve(url)}`;
      } else if (url.indexOf('://') === -1) {
        url = `http://${url}`;
      }

      const filePath = fileName(url);
      await screenshot.init({
        waitFor: sleep,
        disableJS,
        waitUntil,
        emulateConfig,
        screenshotConfig: Object.assign(
          { type, path: filePath },
          type === 'jpeg' ? { quality } : null, // only jpeg have quality
          height ? null : { fullPage: true }, // when height is not specified, using fullPage
        ),
      });

      console.log(`🤖  start take screenshot with ${url}`.data);
      await screenshot.takeScreenshot(url);
      console.log(`🎉  save ${url} with ${filePath.info}`.data);
    }
  } catch (err) {
    console.error(`😿  cannot take screenshot with ${url}`.error);
    console.error(err);
  }
  if (urls.length > 0) await takeAllScreenshot(screenshot);
}

(async () => {
  const screenshot = new Screenshot({
    waitUntil: 'networkidle',
    waitForFunction: scrollToBottom ? () => {
      if (window.page2image.scrollToBottom()) {
        return window.page2image.checkIfImageBeenLoaded();
      }
      return false;
    } : () => window.page2image.checkIfImageBeenLoaded(),
    viewportConfig: { width, height: height || 768, deviceScaleFactor },
  });
  await takeAllScreenshot(screenshot);
  process.exit(0);
})();

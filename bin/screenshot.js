#! /usr/bin/env node
/* eslint-disable no-console */
const args = require('args-parser')(process.argv);
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
  sleep,
  named,
} = args;

function fileName(url) {
  let name = `${url.replace(/http[^/]+\/\//, '').replace(/\//g, '_').replace(/\?.*/, '')}.${type}`;

  if (!fileName.count) fileName.count = 0;
  if (named && named !== true) name = `${named}${fileName.count > 0 ? `_${fileName.count}` : ''}.${type}`;

  fileName.count += 1;
  return name;
}

async function takeAllScreenshot(screenshot) {
  let url = urls.shift();
  try {
    if (typeof url === 'string') {
      if (url.indexOf('://') === -1) { url = `http://${url}`; }
      const path = fileName(url);
      await screenshot.init({
        waitFor: sleep,
        disableJS,
        waitUntil,
        emulateConfig,
        screenshotConfig: Object.assign(
          { type, path },
          type === 'jpeg' ? { quality } : null, // only jpeg have quality
          height ? null : { fullPage: true }, // when height is not specified, using fullPage
        ),
      });

      console.log(`🤖  start take screenshot with ${url}`.data);
      await screenshot.takeScreenshot(url);
      console.log(`🎉  save ${url} with ${path.info}`.data);
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
    waitForFunction: () => {
      window.imageList = window.imageList || Array.from(document.getElementsByTagName('img'));

      return window.imageList.length <= window.imageList.reduce((loaded, imageElm) => (
        imageElm.complete ? loaded + 1 : loaded
      ), 0);
    },
    viewportConfig: { width, height: height || 768, deviceScaleFactor },
  });
  await takeAllScreenshot(screenshot);
  process.exit(0);
})();

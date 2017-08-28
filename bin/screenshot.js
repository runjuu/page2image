#! /usr/bin/env node
/* eslint-disable no-console */
const colors = require('colors');
const args = require('args-parser')(process.argv);
const { default: Screenshot } = require('../');

colors.setTheme({
  info: 'green',
  data: 'grey',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

const isUrl = url => /[^\w]/g.test(url);
const urls = Object.keys(args).filter(key => isUrl(key));
const { width = 1366, height, type = 'png', quality = 100, dpr: deviceScaleFactor = 2, disableJS = false, waitUntil = 'networkidle' } = args;

async function takeAllScreenshot(screenshot) {
  let url = urls.shift();
  try {
    if (typeof url === 'string') {
      if (url.indexOf('://') === -1) { url = `http://${url}`; }
      const path = `${url}.${type}`.replace(/http[^/]+\/\//, '').replace(/\//g, '-');
      await screenshot.init({
        disableJS,
        waitUntil,
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
  if (urls.length > 0) await takeAllScreenshot();
}

(async () => {
  const screenshot = new Screenshot({
    waitUntil: 'networkidle',
    waitForFunction: function waitForFunction() {
      window.imageList = window.imageList || Array.from(document.getElementsByTagName('img'));

      return window.imageList.length <= window.imageList.reduce((loaded, imageElm) => (
        imageElm.complete ? loaded + 1 : loaded
      ), 0);
    },
    viewportConfig: { width, height: height || 768, deviceScaleFactor },
  });
  await takeAllScreenshot(screenshot);
  process.exit();
})();

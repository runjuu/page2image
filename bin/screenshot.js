#! /usr/bin/env node
/* eslint-disable no-console */
const colors = require('colors');
const args = require('args-parser')(process.argv);
const Screenshot = require('../').default;

colors.setTheme({
  info: 'green',
  data: 'grey',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

const urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const urls = Object.keys(args).filter(key => urlReg.test(key));
const { width = 1366, height = 768, type = 'png', quality = 100, fullPage = true } = args;

async function takeAllScreenshot(screenshot) {
  const url = urls.shift();
  try {
    if (typeof url === 'string') {
      const path = `${url}.${type}`.replace(/http[^/]+\/\//, '').replace('/', '-');
      await screenshot.init({
        screenshotConfig: Object.assign(
          { type, fullPage, path },
          type === 'jpeg' ? { quality } : null,
        ),
      });

      console.log(`🤖 start take screenshot with ${url}`.data);
      await screenshot.takeScreenshot(url);
      console.log(`🎉 save ${url} with ${path.info}`.data);
    }
  } catch (err) {
    console.error(`😿 cannot take screenshot with ${url}`.error);
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
    viewportConfig: { width, height },
  });
  await takeAllScreenshot(screenshot);
  process.exit();
})();

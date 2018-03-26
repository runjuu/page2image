import puppeteer from 'puppeteer';
import colors from 'colors';
import filterEmulateInfos from './filterEmulateInfos';
import initPage2imageKits from './kits';

colors.setTheme({
  info: 'green',
  data: 'grey',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
  path: 'white',
});

function checkBeforeRun(config, callback) {
  if (config) return callback(config);
  return Promise.resolve('skip');
}

class Screenshot {

  static async init(config) {
    Object.assign(this.config, config);
    if (!this.browser) this.browser = await puppeteer.launch(this.config.launchConfig);
  }

  static async takeScreenshot(url) {
    if (!url) return null;

    await checkBeforeRun(!this.browser, this.init);

    const page = await this.browser.newPage();
    const {
      waitForFunction, waitUntil,
      screenshotConfig, viewportConfig, emulateConfig,
      disableJS, waitFor, selector,
    } = this.config;

    if (screenshotConfig.path) screenshotConfig.path = screenshotConfig.path.replace(/\?.*\./, '.'); // ? Symbol will cause windows user cannot save file

    await checkBeforeRun(viewportConfig, page.setViewport.bind(page));
    await checkBeforeRun(filterEmulateInfos(emulateConfig), page.emulate.bind(page));
    await checkBeforeRun(disableJS, page.setJavaScriptEnabled.bind(page, false));

    await page.goto(url, { waitUntil });

    await page.evaluate(initPage2imageKits);
    await checkBeforeRun(waitForFunction, page.waitForFunction.bind(page));
    await checkBeforeRun(waitFor, page.waitFor.bind(page));

    async function takeScreenshot() {
      if (selector) {
        delete screenshotConfig.fullPage;
        const element = await page.$(selector);

        if (!element) throw new Error(`element selector "${selector}" can not find any element`);

        return element.screenshot(screenshotConfig);
      } else {
        return page.screenshot(screenshotConfig);
      }
    }

    const pic = await takeScreenshot();

    page.close();

    return pic;
  }

  constructor(config) {
    this.init = Screenshot.init.bind(this);
    this.takeScreenshot = Screenshot.takeScreenshot.bind(this);
    this.config = Object.assign({
      waitForFunction: null,
      waitUntil: null,
      waitFor: null,
      viewportConfig: null,
      selector: null,
      screenshotConfig: {
        quality: 80,
        type: 'jpeg',
        fullPage: true,
      },
    }, config);
  }

}

export default Screenshot;

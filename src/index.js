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

  async init(config) {
    this.updateConfig(config);
    if (!this.browser) this.browser = await puppeteer.launch(this.config.launchConfig);
  }

  updateConfig(config) {
    Object.assign(this.config, config);
  }

  async takeScreenshot(url) {
    if (!url) return null;

    await checkBeforeRun(!this.browser, this.init.bind(this));

    const page = await this.browser.newPage();
    const {
      evaluate, waitUntil,
      screenshotConfig, viewportConfig, emulateConfig,
      disableJS, selector,
    } = this.config;

    if (screenshotConfig.path) screenshotConfig.path = screenshotConfig.path.replace(/\?.*\./, '.'); // ? Symbol will cause windows user cannot save file

    await checkBeforeRun(viewportConfig, page.setViewport.bind(page));
    await checkBeforeRun(filterEmulateInfos(emulateConfig), page.emulate.bind(page));
    await checkBeforeRun(disableJS, page.setJavaScriptEnabled.bind(page, false));

    await page.goto(url, { waitUntil });

    await page.evaluate(initPage2imageKits);
    await checkBeforeRun(evaluate, () => (
      page.evaluate(evaluate.func, evaluate.args)
    ));

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
    this.config = Object.assign({
      evaluate: null,
      waitUntil: null,
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

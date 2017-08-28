import puppeteer from 'puppeteer';

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
      screenshotConfig, viewportConfig,
      disableJS,
    } = this.config;

    await checkBeforeRun(viewportConfig, page.setViewport.bind(page));
    await checkBeforeRun(disableJS, page.setJavaScriptEnabled.bind(page, false));
    await page.goto(url, { waitUntil });
    await checkBeforeRun(waitForFunction, page.waitForFunction.bind(page));

    const pic = await page.screenshot(screenshotConfig);

    page.close();
    return pic;
  }

  constructor(config) {
    this.init = Screenshot.init.bind(this);
    this.takeScreenshot = Screenshot.takeScreenshot.bind(this);
    this.config = Object.assign({
      waitForFunction: null,
      waitUntil: null,
      viewportConfig: null,
      screenshotConfig: {
        quality: 80,
        type: 'jpeg',
        fullPage: true,
      },
    }, config);
  }

}

export default Screenshot;

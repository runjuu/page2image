import * as Koa from 'koa';
import * as puppeteer from 'puppeteer';

interface Config {
  port: number;
  quality: number;
  type: string;
  viewportConfig: object;
  waitForFunction?: Function|string;
  waitUntil?: string;
}

interface Browser {
  close: Function;
  newPage: Function;
}

interface Request {
  query: {
    [key: string]: string;
  };
  set: Function;
  throw: Function;
  type: string;
  body: string;
}

interface KoaInterface {
  listen: Function;
  on: Function;
  use: Function;
}

class ScreenServer {

  browser:Browser;

  config:Config = {
    port: 3000,
    quality: 80,
    type: 'jpeg',
    viewportConfig: null,
    waitUntil: null,
  };

  init(config:Config) {
    Object.assign(this.config, config);
  }

  async takeScreenshot(url:string) {
    if (!url) return null;

    let pic;
    const page = await this.browser.newPage();
    const {
      viewportConfig, quality, type,
      waitForFunction, waitUntil,
    } = this.config;

    if (viewportConfig) {
      page.setViewport(viewportConfig);
    }

    try {
      await page.goto(url, { waitUntil });
      if (waitForFunction) await page.waitForFunction(waitForFunction);
      pic = await page.screenshot({ fullPage: true , quality, type });
    } catch(err) { console.error(err); }

    page.close();
    return pic;
  }

  async server(ctx:Request) {
    try {
      const pic = await this.takeScreenshot(ctx.query.url);

      if (pic) {
        ctx.type = `.${this.config.type || 'jpg'}`;
        ctx.body = pic;
      } else {
        throw new Error('can not take screenshot');
      }

    } catch (err) {
      ctx.throw(400, err);
    }
  }

  async run() {
    if (this.browser) this.browser.close();
    this.browser = await puppeteer.launch();

    const app:KoaInterface = new Koa();

    app.use(this.server.bind(this));
    app.listen(this.config.port);
  }
}

export default ScreenServer;
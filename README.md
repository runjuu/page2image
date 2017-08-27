#  📷 page2image

[![npm version](https://badge.fury.io/js/page2image.svg)](https://www.npmjs.com/package/page2image)
[![Total downloads](https://img.shields.io/npm/dt/page2image.svg)](https://www.npmjs.com/package/page2image)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Runjuu/page2image/pulls)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

😀 page2image is a npm package for taking screenshot by secondary package [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) and also provide [CLI](https://github.com/Runjuu/page2image#using-by-cli) command

## Using By Module 📦

### Install
```bash
npm i page2image --save
```

### Quick Examples
```js
import Screenshot from 'page2image';

const screenshot = new Screenshot({
  waitUntil: 'networkidle',
  waitForFunction: function waitForFunction() {
    window.imageList = window.imageList || Array.from(document.getElementsByTagName('img'));

    return window.imageList.length <= window.imageList.reduce((loaded, imageElm) => (
      imageElm.complete ? loaded + 1 : loaded
    ), 0);
  },
  viewportConfig: { width: 1920, height: 1080 },
  screenshotConfig: { fullPage: true, path: 'screenshot.png' },
});

screenshot
  .takeScreenshot('https://github.com/Runjuu')
  .then(process.exit);

```

### Methods

#### takeScreenshot(url:string)
Accept a url string as an argument and return an image Buffer

#### init([Config:object](https://github.com/Runjuu/page2image#config))
Accept a [Config](https://github.com/Runjuu/page2image#config) object and next time calling takeScreenshot will using new config to take screenshot

### Config: {}

- [waitUntil](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagegotourl-options)
- [waitForFunction](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagewaitforfunctionpagefunction-options-args)
- [viewportConfig](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pageviewport)
- [screenshotConfig](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagescreenshotoptions)

## Using By CLI ⌨️

### Install
```bash
npm i page2image --global
```

### Quick Examples
```bash
page2image https://github.com/Runjuu --type=jpeg --quality=80
```

### Config
In fact, each arguments could be found in [puppeteer's screenshot options](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagescreenshotoptions)

### Suppot Config

#### width
default 1366px
> page's width

#### height
default 768px
> page's height, default will take a full page screenshot.

#### type
default 'png'
> images type

#### quality
default 100
> images quality, but if the type is 'png', quality will not take effect

<br/><hr/>
### 🤔 have any questions? 👉 [new issues](https://github.com/Runjuu/page2image/issues/new) 😉

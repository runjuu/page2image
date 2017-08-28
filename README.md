#  📷 page2image

[![npm version](https://badge.fury.io/js/page2image.svg)](https://www.npmjs.com/package/page2image)
[![Total downloads](https://img.shields.io/npm/dt/page2image.svg)](https://www.npmjs.com/package/page2image)
[![Build Status](https://travis-ci.org/Runjuu/page2image.svg?branch=master)](https://travis-ci.org/Runjuu/page2image)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Runjuu/page2image/pulls)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

page2image is a npm package using [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) for taking screenshot which also provides [CLI](https://github.com/Runjuu/page2image#using-by-cli) command

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

#### init([Config](https://github.com/Runjuu/page2image#config))
Accept a [Config](https://github.com/Runjuu/page2image#config) object and next time calling takeScreenshot will using new config to take screenshot

### Config: {}

- [waitUntil](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagegotourl-options)
- [waitForFunction](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagewaitforfunctionpagefunction-options-args)
- [viewportConfig](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pageviewport)
- [screenshotConfig](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagescreenshotoptions)
- [waitFor](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagewaitforselectororfunctionortimeout-options)
- `disableJS`<[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)>
  - whether or not to disable JavaScript on the page. Defaults to `false`

---
## Using By CLI ⌨️

### Install
```bash
npm i page2image --global
```

### Quick Examples
```bash
# Single page
> page2image https://github.com/Runjuu --type=jpeg --quality=80

# Multi-page
> page2image https://github.com/Runjuu https://github.com/Runjuu --type=jpeg --quality=80
```

### Config <argv>: <default value>

#### width: 1366
> Page width in pixels.

#### height: 768
> Page height in pixels, default will take a full page screenshot.

#### type: png
> Specify screenshot type, could be either 'jpeg' or 'png'.

#### quality: 100
> The quality of the image, between 0-100. Not applicable to png images.

#### dpr: 2
> Specify device scale factor.

#### disableJS: false
> Whether or not to disable JavaScript on the page.

#### waitUntil: networkidle
> When to consider navigation succeeded. [more details](https://github.com/googlechrome/puppeteer/blob/HEAD/docs/api.md#pagegotourl-options)

#### sleep: disable
> Wait ${sleep} milliseconds to take screenshot.

<br/><hr/>
- [x] take screenshots via url
- [ ] take screenshots from local html file

### 🤔 have any questions? 👉 [new issues](https://github.com/Runjuu/page2image/issues/new) 😉

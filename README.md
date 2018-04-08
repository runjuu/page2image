#  📷 page2image

[![npm version](https://badge.fury.io/js/page2image.svg)](https://www.npmjs.com/package/page2image)
[![Total downloads](https://img.shields.io/npm/dt/page2image.svg)](https://www.npmjs.com/package/page2image)
[![Build Status](https://travis-ci.org/Runjuu/page2image.svg?branch=master)](https://travis-ci.org/Runjuu/page2image)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Runjuu/page2image/pulls)
[![Greenkeeper badge](https://badges.greenkeeper.io/Runjuu/page2image.svg)](https://greenkeeper.io/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

page2image is an npm package using [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) for taking screenshots which also provides [CLI](https://github.com/Runjuu/page2image#using-by-cli-️) command

## Using By Module 📦

### Install
```bash
npm i page2image --save
```

### Quick Examples
```js
import Screenshot from 'page2image';

const screenshot = new Screenshot({
  waitUntil: 'networkidle2',
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
- [waitUntil](https://github.com/GoogleChrome/puppeteer/blob/v1.2.0/docs/api.md#pagegotourl-options)
- [evaluate](https://github.com/GoogleChrome/puppeteer/blob/v0.12.0/docs/api.md#pageevaluatepagefunction-args)
- [viewportConfig](https://github.com/GoogleChrome/puppeteer/blob/v0.12.0/docs/api.md#pagesetviewportviewport)
- [screenshotConfig](https://github.com/GoogleChrome/puppeteer/blob/v0.12.0/docs/api.md#pagescreenshotoptions)
- disableJS <[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)>
  - whether or not to disable JavaScript on the page. Defaults to `false`
- [emulateConfig](https://github.com/GoogleChrome/puppeteer/blob/v1.2.0/docs/api.md#pageemulateoptions)
- [selector](https://github.com/GoogleChrome/puppeteer/blob/v1.2.0/docs/api.md#pageselector)
    - if `selector` is valid, page2image will [take screenshot for selected element](https://github.com/GoogleChrome/puppeteer/blob/v1.2.0/docs/api.md#elementhandlescreenshotoptions)
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

# Local file
> page2image ./index.html --type=jpeg --quality=80
```

### Args \<argv\>: \<default value\>

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

#### selector: null
> take a screenshot for the selected element
```bash
page2image https://github.com/Runjuu --selector=".js-contribution-graph"
```

#### disableJS: false
> To disable JavaScript on the page.

#### waitUntil: networkidle2
> When to consider navigation succeeded. [more details](https://github.com/GoogleChrome/puppeteer/blob/v1.2.0/docs/api.md#pagegotourl-options)

#### sleep: 0
##### if sleep is a number
> Wait ${sleep} milliseconds to take screenshot.
##### if sleep is a selector
> Wait for the selector to appear in page

#### emulate: false
> List of all available devices is available in the [source code](https://github.com/Runjuu/page2image/blob/master/src/filterEmulateInfos.js). Below is an example of using `emulate` args to emulate iPhone 6
```bash
page2image https://github.com/Runjuu --emulate=iPhone6 
```

#### scrollToBottom: false
> Wait till viewport scroll to the bottom of the page

#### named: \<default using url to named\>
> Name of screenshot

<br/><hr/>
# To Do
- [x] take screenshots via url
- [x] take screenshots from local html file
- [ ] take multiple screenshots from file

### 🤔 have any questions? 👉 [new issues](https://github.com/Runjuu/page2image/issues/new) 😉

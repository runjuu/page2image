# page2image
> 对 [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) 进行了简易封装的网页截图 npm 包

## Install
```console
npm i page2image
```

## Quick Examples
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

## Methods

### takeScreenshot(url:string)
接受一个字符串链接作为传入值，返回传入链接的页面截图

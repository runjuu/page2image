const ScreenServer = require('./index').default;

const config = {
  port: 3000,
  waitUntil: 'networkidle',
  waitForFunction: () => (
    ((imageList) => (
      imageList.length <= imageList.reduce((loaded, imageElm) => (
        imageElm.complete ? loaded + 1 : loaded
      ), 0)
    ))(window.imageList = window.imageList || Array.from(document.getElementsByTagName('img')))
  ),
  viewportConfig: { width: 670, height: 50 },
};

const screenServer = new ScreenServer();

screenServer.init(config);
screenServer.run();
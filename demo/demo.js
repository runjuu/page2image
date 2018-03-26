const Screenshot = require('../').default;

const screenshot = new Screenshot({
  waitUntil: 'networkidle2',
  viewportConfig: { width: 1920, height: 100 },
  screenshotConfig: { fullPage: true, path: 'screenshot_with_full_page.png' },
  launchConfig: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  },
});

screenshot.takeScreenshot('https://github.com/Runjuu')
  .then(() => {
    screenshot.updateConfig({
      selector: '.js-contribution-graph',
      screenshotConfig: { path: 'screenshot_with_element.png' },
    });
    return screenshot.takeScreenshot('https://github.com/Runjuu');
  })
  .then(process.exit);

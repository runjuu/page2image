function initPage2imageKits() {

  function autoScrollToBottom() {
    autoScrollToBottom.start = true;
    autoScrollToBottom.end = false;

    function scroll() {
      const { clientHeight } = document.documentElement;
      const scrollTimes = document.body.scrollHeight / clientHeight;

      autoScrollToBottom.count = autoScrollToBottom.count + 1 || 0;

      if (autoScrollToBottom.count < scrollTimes) {
        window.scrollTo(0, autoScrollToBottom.count * clientHeight);
        setTimeout(scroll, 300);
      } else {
        autoScrollToBottom.end = true;
      }
    }

    scroll();
  }

  function scrollToBottom() {
    if (!autoScrollToBottom.start) autoScrollToBottom();
    return autoScrollToBottom.end;
  }

  function checkIfImageBeenLoaded() {
    const imageList = Array.from(document.getElementsByTagName('img'));

    return imageList.length <= imageList.reduce((loaded, imageElm) => (
      imageElm.complete ? loaded + 1 : loaded
    ), 0);
  }

  window.page2image = {
    scrollToBottom,
    checkIfImageBeenLoaded,
  };
}

export default initPage2imageKits
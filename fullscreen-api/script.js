(function () {
  function getFullscreenElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  }

  function toggleFullScreen(ele) {
    if (getFullscreenElement()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      ele = ele || document.documentElement;
      ele.requestFullscreen().catch(console.log);
    }
  }

  function onLoad() {
    const $box = document.querySelector('#myBox');
    const $fullscreenbtn = document.querySelector('#fullscreen');
    $fullscreenbtn.addEventListener(
      'click',
      () => {
        toggleFullScreen();
      },
      false
    );

    $box.addEventListener(
      'click',
      () => {
        toggleFullScreen($box);
      },
      false
    );
  }
  document.addEventListener('DOMContentLoaded', onLoad);
})();

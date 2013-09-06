var PRESENTATION_WIDTH = 1440;//900;
var PRESENTATION_HEIGHT = 900;

chrome.app.runtime.onLaunched.addListener(function() {
/*  if (presentationWindow && !presentationWindow.closed) {
    presentationWindow.chrome.app.window.focus();
    return;
  }
*/

  var left = Math.max((screen.width - PRESENTATION_WIDTH)/2, 0);
  var top = Math.max((screen.height - PRESENTATION_HEIGHT)/2, 0);
  chrome.app.window.create('presentation.html?presentme=true', {
      left: left, top: top,
      width: PRESENTATION_WIDTH, height: PRESENTATION_HEIGHT,
      minWidth: PRESENTATION_WIDTH, minHeight: PRESENTATION_HEIGHT,
      maxWidth: PRESENTATION_WIDTH, maxHeight: PRESENTATION_HEIGHT
  });

});

/*
var windowingApiDemo = {
  windows: [],

  clear: function() {
    if (windowingApiDemo.updateInterval) {
      clearInterval(windowingApiDemo.updateInterval);
    }

    windowingApiDemo.windows.forEach(function(w) {w.close()});
    windowingApiDemo.windows = [];
  },

  launch: function() {
    windowingApiDemo.clear();
    chrome.app.window.create('windowing_api/original.html', {
      top: 128,
      left: 128,
      width: 256,
      height: 256
    }, function(originalWindow) {
      windowingApiDemo.windows.push(originalWindow);
      chrome.app.window.create('windowing_api/copycat.html', {
        top: 128,
        left: 384 + 5,
        width: 256,
        height: 256,
        frame: 'none'
      }, function(copycatWindow) {
        windowingApiDemo.windows.push(copycatWindow);

        windowingApiDemo.updateInterval = setInterval(function() {
          if (originalWindow.closed || copycatWindow.closed) {
            windowingApiDemo.clear();
            return;
          }

          copycatWindow.moveTo(
              originalWindow.screenX + originalWindow.outerWidth + 5,
              originalWindow.screenY);
          copycatWindow.resizeTo(
              originalWindow.outerWidth,
              originalWindow.outerHeight);
        }, 10);

        originalWindow.chrome.app.window.focus();
      });
    });
  },

  minimizeAll: function() {
    windowingApiDemo.windows.forEach(function(w) {w.chrome.app.window.minimize()});
    setTimeout(windowingApiDemo.clear, 2000);
  }
}
*/
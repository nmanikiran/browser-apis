document.addEventListener("DOMContentLoaded", () => {
  var logEvents = false;

  // Touch Point cache
  var tpCache = new Array();

  function startHandler(event) {
    // If the user makes simultaneious touches, the browser will fire a
    // separate touchstart event for each touch point. Thus if there are
    // three simultaneous touches, the first touchstart event will have
    // targetTouches length of one, the second event will have a length
    // of two, and so on.
    event.preventDefault();
    // Cache the touch points for later processing of 2-touch pinch/zoom
    if (event.targetTouches.length == 2) {
      for (var i = 0; i < event.targetTouches.length; i++) {
        tpCache.push(event.targetTouches[i]);
      }
    }
    if (logEvents) log("touchStart", event, true);
    updateBackground(event);
  }

  function moveHandler(event) {
    // Note: if the user makes more than one "simultaneous" touches, most browsers
    // fire at least one touchmove event and some will fire several touchmoves.
    // Consequently, an application might want to "ignore" some touchmoves.
    //
    // This function sets the target element's outline to "dashed" to visualy
    // indicate the target received a move event.
    //
    event.preventDefault();
    if (logEvents) log("touchMove", event, false);
    // To avoid too much color flashing many touchmove events are started,
    // don't update the background if two touch points are active
    if (!(event.touches.length == 2 && event.targetTouches.length == 2))
      updateBackground(event);

    // Set the target element's outline to dashed to give a clear visual
    // indication the element received a move event.
    event.target.style.outline = "dashed";
  }

  function endHandler(event) {
    event.preventDefault();
    if (logEvents) log(event.type, event, false);
    if (event.targetTouches.length == 0) {
      // Restore background and outline to original values
      event.target.style.background = "white";
      event.target.style.outline = "1px solid black";
    }
  }

  function setHandlers(name) {
    // Install event handlers for the given element
    var $el = document.getElementById(name);
    $el.ontouchstart = startHandler;
    $el.ontouchmove = moveHandler;
    // Use same handler for touchcancel and touchend
    $el.ontouchcancel = endHandler;
    $el.ontouchend = endHandler;
  }

  function updateBackground(event) {
    // Change background color based on the number simultaneous touches
    // in the event's targetTouches list:
    switch (event.targetTouches.length) {
      case 1:
        // Single tap`
        event.target.style.background = "yellow";
        break;
      case 2:
        // Two simultaneous touches
        event.target.style.background = "pink";
        break;
      default:
        // More than two simultaneous touches
        event.target.style.background = "lightblue";
    }
  }

  function init() {
    setHandlers("target1");
    setHandlers("target2");
    setHandlers("target3");
    setHandlers("target4");
  }
  init();
});

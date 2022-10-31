async function initExitIntent({
  popup,
  closeButton,
  activeClass,
  timesToShow = 1,
  startDelay = 0,
  mouseleave = {
    active: false,
    breakpoint: [769],
  },
  scrollSpeed = {
    active: false,
    breakpoint: [0, 768],
  },
  userInactive = {
    active: false,
    maxIdleTime: 10000,
    breakpoint: [0, 768],
  },
}) {
  await delay(startDelay);
  let timesCounter = 0;

  function setTimes(counter) {
    timesCounter = counter;
  }

  if (handleBreakpoints(scrollSpeed)) {
    setEvents("scroll", initScrollSpeed);
  }

  if (handleBreakpoints(mouseleave)) {
    setEvents("mouseleave", initMouseleave);
  }

  var removeEvent;

  function setEvents(name = "", fn = () => {}) {
    $(document).on(name, fn);
    removeEvent = () => {
      var mustRemove = timesCounter >= timesToShow;

      if (mustRemove) {
        $(document).off(name, fn);
      } else {
        setTimes(timesCounter + 1);
      }

      return mustRemove;
    };
  }

  if (handleBreakpoints(userInactive)) {
    initUserInactive({
      userInactive: { ...userInactive },
      popup: popup,
      timesCounter: timesCounter,
      timesToShow: timesToShow,
      activeClass: activeClass,
    });
  }

  $(closeButton).on("click", hidePopup);

  if (!activeClass) $(popup).hide();

  function showPopup() {
    if (!activeClass) $(popup).show();
    else $(popup).addClass(activeClass);
  }

  function hidePopup() {
    if (!activeClass) $(popup).hide();
    else $(popup).removeClass(activeClass);
  }

  function initMouseleave(e) {
    var cordenadas = {
      top: e.clientY,
      left: e.clientX,
      deviceWidth: $(document).width(),
    };
    if (
      cordenadas.top < 0 ||
      cordenadas.left < 0 ||
      cordenadas.left > cordenadas.deviceWidth
    ) {
      if (removeEvent()) return;
      else showPopup();
    }
  }

  async function initScrollSpeed() {
    var lastPosition = window.scrollY;
    var speed = 320;

    setTimeout(() => {
      var newPosition = window.scrollY;
      var currentSpeed = lastPosition - newPosition;

      if (currentSpeed > speed) {
        if (removeEvent()) return;
        else showPopup();
      }
    }, 100);
  }
}

async function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

function handleBreakpoints({ active, breakpoint = [] }) {
  var result = false;
  if (!active) return result;

  var deviceWidth = $(document).width();

  if (breakpoint.length === 1) {
    result = deviceWidth >= breakpoint[0];
  } else if (breakpoint.length === 2) {
    var greater = deviceWidth >= breakpoint[0];
    var less = deviceWidth <= breakpoint[1];
    result = greater && less;
  }

  return result;
}

function initUserInactive({
  userInactive,
  popup,
  oneTime = true,
  activeClass = "active",
}) {
  // set events
  var events = ["mousemove", "mousedown", "click", "scroll", "keypress"];
  events.forEach((event) => $(document).on(event, resetTimer));

  function createTimeout({ maxIdleTime, showPopup }) {
    return () => setTimeout(showPopup, maxIdleTime);
  }

  var handleTimeout = createTimeout({
    showPopup,
    ...userInactive,
  });

  var timeout = handleTimeout();

  function resetTimer() {
    clearTimeout(timeout);
    timeout = handleTimeout();
  }

  function showPopup() {
    $(popup).addClass(activeClass);
    if (oneTime) deleteEvents(events);
  }

  function deleteEvents(events) {
    events.forEach((event) => $(document).off(event, resetTimer));
  }
}

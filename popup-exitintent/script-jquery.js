async function initExitIntent({
  popup,
  closeButton,
  activeClass,
  timesToShow = 1,
  startDelay = 0,
  oneTime = true,
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
  let times = 0;

  function setTimes(counter) {
    times = counter;
  }

  if (handleBreakpoints(scrollSpeed)) {
    $(document).on("scroll", initScrollSpeed);
  }

  if (handleBreakpoints(mouseleave)) {
    $(document).on("mouseleave", initMouseleave);
  }

  initUserInactive({
    userInactive: { ...userInactive },
    popup: popup,
    oneTime: oneTime,
    activeClass: activeClass,
  });

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

  function removeEvent(event, fn) {
    var mustRemove = times >= timesToShow;

    if (mustRemove) {
      $(document).off(event, fn);
    } else {
      setTimes(times + 1);
    }

    return mustRemove;
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
      if (removeEvent("mouseleave", initMouseleave)) return;
      showPopup();
    }
  }

  async function initScrollSpeed() {
    var lastPosition = window.scrollY;
    var speed = 320;

    setTimeout(() => {
      var newPosition = window.scrollY;
      var currentSpeed = lastPosition - newPosition;

      if (currentSpeed > speed) {
        if (removeEvent("scroll", initScrollSpeed)) return;
        showPopup();
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
  var { maxIdleTime } = userInactive;
  if (!handleBreakpoints(userInactive)) return;

  function showPopup() {
    $(popup).addClass(activeClass);
    if (oneTime) deleteEvents(events);
  }

  var timeout = setTimeout(showPopup, maxIdleTime);

  var events = ["mousemove", "mousedown", "click", "scroll", "keypress"];

  function setEvents(events) {
    events.forEach((event) => $(document).on(event, resetTimer));
  }
  setEvents(events);

  function deleteEvents(events) {
    events.forEach((event) => $(document).off(event, resetTimer));
  }

  function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(showPopup, maxIdleTime);
  }
}

$(document).ready(function () {
  var breakpoints = {
    desktop: [769],
    mobile: [0, 768],
  };

  initExitIntent({
    popup: ".initExitIntent",
    closeButton: ".close",
    activeClass: "active",
    timesToShow: 1,
    startDelay: 0,
    mouseleave: {
      active: true,
      breakpoint: breakpoints.desktop,
    },
    scrollSpeed: {
      active: false,
      breakpoint: breakpoints.mobile,
    },
    userInactive: {
      active: true,
      maxIdleTime: 10000,
      breakpoint: breakpoints.mobile,
    },
  });
});

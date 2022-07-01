$(document).ready(function () {
  function initExitIntent({
    popup,
    closeButton,
    activeClass,
    oneTime = true,
    mobileBreakpoint = 768,
  }) {
    var deviceWidth = $(document).width();
    var isMobileDevice = deviceWidth <= mobileBreakpoint;

    if (isMobileDevice) {
      $(document).on("scroll", scrollSpeed);
    } else {
      $(document).on("mouseleave", mouseleave);
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

    function removeEvent(event, fn) {
      if (oneTime) $(document).off(event, fn);
    }

    function mouseleave() {
      showPopup();
      removeEvent("mouseleave", mouseleave);
    }

    async function scrollSpeed() {
      var lastPosition = window.scrollY;
      var speed = 320;

      setTimeout(() => {
        let newPosition = window.scrollY;
        let currentSpeed = lastPosition - newPosition;

        if (currentSpeed > speed) {
          showPopup();
          removeEvent("scroll", scrollSpeed);
        }
      }, 100);
    }
  }

  initExitIntent({
    popup: ".initExitIntent",
    closeButton: ".close",
    activeClass: "active",
    oneTime: true,
  });
});

function initExitIntent({
  popup,
  closeButton,
  activeClass,
  oneTime = true,
  mobileBreakpoint = 768,
}) {
  var deviceWidth = document.querySelector("html").offsetWidth;
  var isMobileDevice = deviceWidth <= mobileBreakpoint;

  if (isMobileDevice) {
    document.addEventListener("scroll", scrollSpeed);
  } else {
    document.addEventListener("mouseleave", mouseleave);
  }

  const $closeButton = document.querySelector(closeButton);
  $closeButton.addEventListener("click", hidePopup);

  const $popup = document.querySelector(popup);
  if (!activeClass) $popup.style.display = "none";

  function showPopup() {
    if (!activeClass) $popup.$popup.style.display = "block";
    else $popup.classList.add(activeClass);
  }

  function hidePopup() {
    if (!activeClass) $popup.style.display = "none";
    else $popup.classList.remove(activeClass);
  }

  function removeEvent(event, fn) {
    if (oneTime) document.removeEventListener(event, fn);
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

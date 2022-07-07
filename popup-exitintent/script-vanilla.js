async function initExitIntent({
  popup,
  closeButton,
  activeClass,
  oneTime = true,
  mobileBreakpoint = 768,
  startDelay = 0,
}) {
  await delay(startDelay);
  var html = document.querySelector("html");
  var deviceWidth = html.offsetWidth;
  var isMobileDevice = deviceWidth <= mobileBreakpoint;

  if (isMobileDevice) {
    html.addEventListener("scroll", scrollSpeed);
  } else {
    html.addEventListener("mouseleave", mouseleave);
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

  function mouseleave(e) {
    var cordenadas = {
      top: e.clientY,
      left: e.clientX,
      deviceWidth,
    };
    if (
      cordenadas.top < 0 ||
      cordenadas.left < 0 ||
      cordenadas.left > cordenadas.deviceWidth
    ) {
      showPopup();
      removeEvent("mouseleave", mouseleave);
    }
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

async function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

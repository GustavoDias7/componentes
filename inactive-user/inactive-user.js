function inactiveUser({
  maxIdleTime = 10000,
  popup = "",
  classToActive = "active",
  btnToClosePopup = "",
}) {
  const $popup = document.querySelector(popup);
  $popup.addEventListener("click", ({ target, currentTarget }) => {
    //close popup when clicked outside the popup content
    if (target === currentTarget) $popup.classList.remove(classToActive);
  });

  function displayPopup() {
    $popup.classList.add(classToActive);
  }
  let timeout = setTimeout(displayPopup, maxIdleTime);

  function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(displayPopup, maxIdleTime);
  }

  const events = ["mousemove", "mousedown", "click", "scroll", "keypress"];
  events.forEach((event) => window.addEventListener(event, resetTimer));

  const $btnToClosePopup = document.querySelector(btnToClosePopup);
  $btnToClosePopup.addEventListener("click", (e) => {
    e.preventDefault();
    $popup.classList.remove(classToActive);
  });
}

inactiveUser({
  maxIdleTime: 3000,
  popup: "#popup-01",
  classToActive: "active",
  btnToClosePopup: "#popup-01 .close-btn",
});

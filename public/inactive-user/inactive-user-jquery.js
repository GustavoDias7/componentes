function inactiveUser({
  maxIdleTime = 10000,
  popup = "",
  activeClass = "active",
}) {
  var $popup = $(popup);

  function showPopup() {
    $popup.addClass(activeClass);
  }

  var timeout = setTimeout(showPopup, maxIdleTime);

  function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(showPopup, maxIdleTime);
  }

  var events = ["mousemove", "mousedown", "click", "scroll", "keypress"];
  events.forEach((event) => $(document).on(event, resetTimer));
}

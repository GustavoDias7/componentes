function initTooltip({ trigger, tooltip, placement = "bottom" }) {
  const $trigger = document.querySelector(`#${trigger}`);
  const $tooltip = document.querySelector(`#${tooltip}`);

  const popperInstance = Popper.createPopper($trigger, $tooltip, {
    placement: placement,
    modifiers: [
      { name: "flip", options: { padding: 8 } },
      { name: "offset", options: { offset: [0, 8] } },
    ],
  });

  const showEvents = ["mouseenter", "focus"];
  const hideEvents = ["mouseleave", "blur"];
  const dataShow = "data-show";

  showEvents.forEach((event) => {
    $trigger.addEventListener(event, () => {
      $tooltip.setAttribute(dataShow, "");
      popperInstance.update();
    });
  });

  hideEvents.forEach((event) => {
    $trigger.addEventListener(event, () => {
      $tooltip.removeAttribute(dataShow);
    });
  });
}

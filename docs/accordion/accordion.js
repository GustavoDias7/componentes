function initAccordion({
  selectorName = "",
  onlyOneOpen = false,
  activeClass = "active",
}) {
  const $accordions = document.querySelectorAll(selectorName);
  let lastOpen = 0;
  let setLastOpen = (newValue) => (lastOpen = newValue);

  $accordions.forEach((accordion, index) => {
    accordion.addEventListener("click", (event) => {
      event.currentTarget.classList.toggle(activeClass);
      if (onlyOneOpen === false) return;
      let isDifferent = $accordions[lastOpen] != accordion;
      if (isDifferent) {
        $accordions[lastOpen].classList.remove(activeClass);
        setLastOpen(index);
      }
    });
  });
}
initAccordion({
  selectorName: "[data-accordion]",
});
initAccordion({
  selectorName: "[data-only]",
  onlyOneOpen: true,
});

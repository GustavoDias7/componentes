function accordion(selectorName, onlyOneOpen = false) {
  const accordions = document.querySelectorAll(selectorName);
  let lastOpen = 0
  let setLastOpen = (newValue) => {
    lastOpen = newValue;
  };

  accordions.forEach((accordion, index) => {
    accordion.addEventListener('click', (event) => {
      event.currentTarget.toggleAttribute('show');
      if (onlyOneOpen === false) return;
      let isDifferent = accordions[lastOpen] != accordion;
      if (isDifferent) {
        accordions[lastOpen].removeAttribute('show');
        setLastOpen(index);
      }
    })
  })
}
accordion('[data-accordion]');
accordion('[data-only]', true);

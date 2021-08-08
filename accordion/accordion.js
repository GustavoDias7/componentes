function accordion(selector) {
  const accordions = document.querySelectorAll(selector);
  accordions.forEach((accordion) => {
    accordion.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('show');
    })
  })
}
accordion('.accordion-js');
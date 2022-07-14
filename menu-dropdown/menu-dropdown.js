function initMenuDropdown({
  menuDropdown,
  classActiveDropdown,
}) {
  
  const $menuDropdown = document.querySelectorAll(menuDropdown);
  $menuDropdown.forEach(($menu) => {
    $menu.addEventListener('click', handleClick);
    function handleClick() {
      this.classList.toggle(classActiveDropdown);
      outsideClick(this, () => {
        this.classList.remove(classActiveDropdown)
      });
    }
    function outsideClick(element, callback) {
      const html = document.documentElement;
      const outside = 'data-outside';

      if (!element.hasAttribute(outside)) {
        setTimeout(() => html.addEventListener('click', handleOutsideClick));
        element.setAttribute(outside, '')
      }
      function handleOutsideClick(event) {
        if (!element.contains(event.target)) {
          element.removeAttribute(outside);
          html.removeEventListener('click', handleOutsideClick);
          callback();
        }
      }
    }
  });
}
initMenuDropdown({
  menuDropdown: '[data-dropdown]',
  classActiveDropdown: 'active',
});
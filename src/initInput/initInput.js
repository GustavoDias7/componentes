function initInput({ selector = ".input", activeClass = "active" }) {
  const $fields = document.querySelectorAll(selector);
  $fields.forEach(function ($field) {
    if ($field.value.length > 0) $field.classList.add(activeClass);
    $field.addEventListener("input", function (e) {
      const hasValue = e.target.value.length;
      if (hasValue) e.target.classList.add(activeClass);
      else e.target.classList.remove(activeClass);
    });
  });
}

module.exports = initInput;

const $modals = document.querySelectorAll(".modal");
$modals.forEach((modal) => {
  initModal({ modal: `#${modal?.id}` });
});

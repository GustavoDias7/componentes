const $modals = document.querySelectorAll(".modal");
$modals.forEach((modal) => {
  const modalInit = initModal({ modal: `#${modal?.id}` });
  if (modal?.id === "modal2") modalInit.open();
});

const modalInit = initModal({ modal: `#modalTest` });
if (!modalInit.hasModal()) console.log(modalInit.message);

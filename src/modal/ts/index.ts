const $modals = document.querySelectorAll(".modal");
$modals.forEach((modal) => {
  const modalInit = initModal({
    selector: `#${modal?.id}`,
  });
  if (modal?.id === "modal2") modalInit.open();
});

const modalInit = initModal({ selector: `#modalTest` });
if (!modalInit?.hasModal()) console.log(modalInit.message);

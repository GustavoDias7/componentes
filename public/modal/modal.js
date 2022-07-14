function initModal({
  modalContainer,
  btnToActiveModal,
  btnToCloseModal,
  activeModalOnLoad = false,
  activeModalOnTrigger = { enable: false },
  inactiveUser = { enable: false },
}) {
  let $btnToActiveModal;
  try {
    $btnToActiveModal = document.querySelectorAll(btnToActiveModal);
    $btnToActiveModal.forEach((event) => {
      event.addEventListener("click", toggleModal);
    });
  } catch (error) {
    console.warn("Button to active modal not found.");
  }

  const $modalContainer = document.querySelector(modalContainer);
  $modalContainer.addEventListener("click", toggleModal);

  const $btnToCloseModal = document.querySelector(btnToCloseModal);
  $btnToCloseModal.addEventListener("click", toggleModal);

  function toggleModal(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;
    $modalContainer.classList.toggle("modal-active");
  }

  if (activeModalOnLoad) {
    $modalContainer.classList.add("modal-active");
  }

  if (activeModalOnTrigger.enable) {
    const $modalTrigger = document.querySelector(
      activeModalOnTrigger.elements.trigger
    );
    const $modalTarget = document.querySelector(
      activeModalOnTrigger.elements.target
    );

    $modalTrigger.addEventListener(
      activeModalOnTrigger.eventListener,
      (event) => {
        if (event.target === event.currentTarget) {
          $modalTarget.classList.add("modal-active");
        }
      }
    );
  }

  if (inactiveUser.enable) {
    function displayPopup() {
      $modalContainer.classList.add("modal-active");
    }

    let timeout = setTimeout(displayPopup, inactiveUser.maxIdleTime);

    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(displayPopup, inactiveUser.maxIdleTime);
    }

    const events = ["mousemove", "mouseDown", "click", "scroll", "keypress"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
  }
}

initModal({
  modalContainer: "#modal1",
  btnToActiveModal: "#modal-active1",
  btnToCloseModal: "#modal-close1",
  inactiveUser: { enable: true, maxIdleTime: 2000 },
});

initModal({
  modalContainer: "#modal2",
  btnToActiveModal: "#modal-close1",
  btnToCloseModal: "#modal-close2",
  activeModalOnLoad: true,
  activeModalOnTrigger: {
    enable: true,
    elements: {
      trigger: "#modal1",
      target: "#modal2",
    },
    eventListener: "click",
  },
});

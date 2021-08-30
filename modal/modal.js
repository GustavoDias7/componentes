function initModal({
  modalContainer,
  btnToActiveModal,
  btnToCloseModal,
  activeModalOnLoad = false,
  activeModalOnTrigger = { enable: false },
}) {
  let $btnToActiveModal;
  try {
    $btnToActiveModal = document.querySelectorAll(btnToActiveModal);
    $btnToActiveModal.forEach((event) => {
      event.addEventListener('click', toggleModal);
    });
  } catch (error) {
    console.warn('Button to active modal not found.');
  }

  const $modalContainer = document.querySelector(modalContainer);
  $modalContainer.addEventListener('click', toggleModal);

  const $btnToCloseModal = document.querySelector(btnToCloseModal);
  $btnToCloseModal.addEventListener('click', toggleModal);

  function toggleModal(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;
    $modalContainer.classList.toggle('modal-active');
  }

  if (activeModalOnLoad) {
    $modalContainer.classList.add('modal-active');
  }

  if (activeModalOnTrigger.enable) {
    const $modalTrigger = document.querySelector(activeModalOnTrigger.elements.trigger);
    const $modalTarget = document.querySelector(activeModalOnTrigger.elements.target);

    $modalTrigger.addEventListener(activeModalOnTrigger.eventListener, (event) => {
      if (event.target === event.currentTarget) {
        $modalTarget.classList.add('modal-active');
      }
    });
  }
}

initModal({
  modalContainer: '#modal1',
  btnToActiveModal: '#modal-active1',
  btnToCloseModal: '#modal-close1',
});

initModal({
  modalContainer: '#modal2',
  btnToActiveModal: '#modal-close1',
  btnToCloseModal: '#modal-close2',
  activeModalOnLoad: true,
  activeModalOnTrigger: {
    enable: true,
    elements: {
      trigger: '#modal1',
      target: '#modal2',
    },
    eventListener: 'click',
  },
});

interface Modal {
  modal: string;
  activeModalOnLoad?: boolean | undefined;
  activeModalOnTrigger: {
    enable: boolean;
    elements: {
      trigger: string;
      target: string;
    };
    eventListener: string;
  };
  inactiveUser: { enable: boolean; maxIdleTime: number };
  activeClass: string;
}

function initModal({
  modal = "",
  activeModalOnLoad = false,
  activeModalOnTrigger = {
    enable: false,
    elements: {
      trigger: "",
      target: "",
    },
    eventListener: "click",
  },
  inactiveUser = { enable: false, maxIdleTime: 1000 },
  activeClass = "active",
}): void {
  const $modalContainer = document.querySelector(modal);
  if (!$modalContainer) return;
  $modalContainer.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) return;
    $modalContainer.classList.toggle(activeClass);
  });

  const activeSelector = `[data-modal-active="${modal}"]`;
  const $btnToActiveModal = document.querySelectorAll(activeSelector);
  if (!$btnToActiveModal) return;
  $btnToActiveModal.forEach((event: EventTarget) => {
    event.addEventListener("click", toggleModal);
  });

  const closeSelector = `[data-modal-close="${modal}"]`;
  const $btnToCloseModal = document.querySelectorAll(closeSelector);
  if (!$btnToCloseModal) return;
  $btnToCloseModal.forEach((event: EventTarget) => {
    event.addEventListener("click", toggleModal);
  });

  function toggleModal(event: Event) {
    if (event.target !== event.currentTarget) return;
    $modalContainer?.classList.toggle(activeClass);
  }

  if (activeModalOnLoad) {
    $modalContainer.classList.add(activeClass);
  }

  if (activeModalOnTrigger.enable) {
    const triggerSelector = activeModalOnTrigger.elements.trigger;
    const $modalTrigger = document.querySelector(triggerSelector);
    const targetSelector = activeModalOnTrigger.elements.target;
    const $modalTarget = document.querySelector(targetSelector);

    if ($modalTrigger && $modalTarget) {
      const eventName = activeModalOnTrigger.eventListener;
      $modalTrigger.addEventListener(eventName, (event) => {
        if (event.target === event.currentTarget) {
          $modalTarget.classList.add(activeClass);
        }
      });
    }
  }

  if (inactiveUser.enable) {
    const { maxIdleTime } = inactiveUser;
    let timeout = setTimeout(displayPopup, maxIdleTime);
    function displayPopup() {
      $modalContainer?.classList.add(activeClass);
    }

    const events = ["mousemove", "mouseDown", "click", "scroll", "keypress"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(displayPopup, maxIdleTime);
    }
  }
}

initModal({
  modal: "#modal1",
  inactiveUser: { enable: true, maxIdleTime: 2000 },
});

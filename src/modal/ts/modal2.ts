interface Modal {
  modal: string;
  activeModalOnLoad?: boolean;
  activeModalOnTrigger?: {
    enable: boolean;
    elements: {
      trigger: string;
      target: string;
    };
    eventListener: string;
  };
  activeClass?: string;
}

interface Trigger {
  enable: boolean;
  elements: {
    trigger: string;
    target: string;
  };
  eventListener: string;
}

function errorMessageElement(elementName: string) {
  console.error(`The element '${elementName}' does not exist!`);
  return false;
}

function errorMessageOpen() {
  console.error(
    `There's no way to open modal. Set a data-modal-open attribute in the html or set the property activeModalOnLoad as true.`
  );
  return false;
}

function handleTrigger(
  activeModalOnTrigger: Trigger,
  activeClass: string
): void {
  if (activeModalOnTrigger.enable) {
    const triggerSelector = activeModalOnTrigger?.elements?.trigger;
    const $modalTrigger = document.querySelector(triggerSelector);
    const targetSelector = activeModalOnTrigger?.elements?.target;
    const $modalTarget = document.querySelector(targetSelector);
    const eventName = activeModalOnTrigger?.eventListener;

    if ($modalTrigger && $modalTarget && eventName) {
      $modalTrigger.addEventListener(eventName, (event: Event) => {
        if (event.target === event.currentTarget) {
          $modalTarget.classList.add(activeClass);
        }
      });
    }
  }
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
  activeClass = "active",
}: Modal): boolean {
  // selectors
  let $modalContainer: HTMLElement;
  let $btnToOpenModal: NodeList;
  let $btnToCloseModal: NodeList;

  const openSelector = `[data-modal-open="${modal}"]`;
  const closeSelector = `[data-modal-close="${modal}"]`;

  try {
    $modalContainer = document.querySelector(modal);
    $btnToOpenModal = document.querySelectorAll(openSelector);
    $btnToCloseModal = document.querySelectorAll(closeSelector);
  } catch (err) {
    console.error(err);
    return false;
  }

  // validation
  const hasModal = Boolean($modalContainer);
  if (!hasModal) return errorMessageElement(modal);

  const hasBtnClose = Boolean($btnToCloseModal.length);
  if (!hasBtnClose) return errorMessageElement(closeSelector);

  const hasWayToOpen = Boolean($btnToOpenModal.length) || activeModalOnLoad;
  if (!hasWayToOpen) return errorMessageOpen();

  // handles
  if (activeModalOnLoad) $modalContainer.classList.add(activeClass);

  $modalContainer.addEventListener("click", (event: Event) => {
    if (event.target !== event.currentTarget) return;
    $modalContainer.classList.toggle(activeClass);
  });

  $btnToOpenModal.forEach((event: EventTarget) => {
    event.addEventListener("click", () => {
      $modalContainer.classList.add(activeClass);
    });
  });

  $btnToCloseModal.forEach((event: EventTarget) => {
    event.addEventListener("click", () => {
      $modalContainer.classList.remove(activeClass);
    });
  });

  handleTrigger(activeModalOnTrigger, activeClass);

  return true;
}

const $modals = document.querySelectorAll(".modal");
$modals.forEach((modal) => {
  initModal({ modal: `#${modal?.id}` });
});

interface Modal {
  modal: string;
  activeModalOnLoad?: boolean;
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

interface Return {
  open?: () => void;
  close?: () => void;
  message?: string;
  hasModal: () => boolean;
}

function errorMessageElement(elementName: string) {
  const message = `The element '${elementName}' does not exist!`;
  console.error(message);
  return errorFactory(message, false);
}

function errorMessageOpen() {
  const message = `There's no way to open modal. Set a data-modal-open attribute in the html or set the property activeModalOnLoad as true.`;
  console.error(message);
  return errorFactory(message, false);
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

function errorFactory(message: string, hasModalContainer: boolean) {
  return { message, hasModal: () => hasModalContainer };
}

function initModal({
  modal = "",
  activeModalOnLoad = false,
  activeClass = "active",
}: Modal): Return {
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
    return errorFactory(err.message, false);
  }

  // validation
  const hasModalContainer = Boolean($modalContainer);
  if (!hasModalContainer) return errorMessageElement(modal);

  const hasBtnClose = Boolean($btnToCloseModal.length);
  if (!hasBtnClose) return errorMessageElement(closeSelector);

  const hasWayToOpen = Boolean($btnToOpenModal.length) || activeModalOnLoad;
  if (!hasWayToOpen) return errorMessageOpen();

  // listeners
  if (activeModalOnLoad) open();

  $modalContainer.addEventListener("click", (event: Event) => {
    const isOrverlay = event.target === event.currentTarget;
    if (!isOrverlay) return;
    $modalContainer.classList.remove(activeClass);
  });

  $btnToOpenModal.forEach((event: EventTarget) => {
    event.addEventListener("click", open);
  });

  $btnToCloseModal.forEach((event: EventTarget) => {
    event.addEventListener("click", close);
  });

  // functions
  function open(): void {
    $modalContainer.classList.add(activeClass);
  }
  function close(): void {
    $modalContainer.classList.remove(activeClass);
  }
  function hasModal(): boolean {
    return hasModalContainer;
  }

  return {
    open,
    close,
    hasModal,
  };
}

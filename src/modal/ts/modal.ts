interface Modal {
  selector: string;
  activeModalOnLoad?: boolean;
  activeClass?: string;
  debug?: boolean;
}

interface Return {
  open?: () => void;
  close?: () => void;
  message?: string;
  hasModal: () => boolean;
}

function initModal({
  selector: modalSelector = "",
  activeModalOnLoad = false,
  activeClass = "active",
  debug = false,
}: Modal): Return {
  // selectors
  let $modalContainer: HTMLElement;
  let $btnToOpenModal: NodeList;
  let $btnToCloseModal: NodeList;

  const openSelector = `[data-modal-open="${modalSelector}"]`;
  const closeSelector = `[data-modal-close="${modalSelector}"]`;

  try {
    $modalContainer = document.querySelector(modalSelector);
    $btnToOpenModal = document.querySelectorAll(openSelector);
    $btnToCloseModal = document.querySelectorAll(closeSelector);
  } catch (err) {
    debug && console.error(err);
    return errorFactory(err.message, false);
  }

  // validation
  const hasModalContainer = Boolean($modalContainer);
  if (!hasModalContainer) return errorMessageElement(modalSelector, debug);

  const hasBtnClose = Boolean($btnToCloseModal.length);
  if (!hasBtnClose) return errorMessageElement(closeSelector, debug);

  const hasWayToOpen = Boolean($btnToOpenModal.length) || activeModalOnLoad;
  if (!hasWayToOpen) return errorMessageOpen(debug);

  // listeners
  if (activeModalOnLoad) open();

  $modalContainer.addEventListener("click", (event: Event) => {
    const isOverlay = event.target === event.currentTarget;
    if (!isOverlay) return;
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

  // errors
  function errorMessageElement(elementName: string, debug: boolean) {
    const message = `The element '${elementName}' does not exist!`;
    debug && console.error(message);
    return errorFactory(message, false);
  }
  function errorMessageOpen(debug: boolean) {
    const message = `There's no way to open modal. Set a data-modal-open attribute in the html or set the property activeModalOnLoad as true.`;
    debug && console.error(message);
    return errorFactory(message, false);
  }
  function errorFactory(message: string, hasModalContainer: boolean) {
    return { message, hasModal: () => hasModalContainer };
  }

  return {
    open,
    close,
    hasModal,
  };
}

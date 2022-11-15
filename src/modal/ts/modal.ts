interface ModalOptions {
  selector: string;
  autoOpen?: boolean;
  activeClass?: string;
  debug?: boolean;
}

interface Return {
  open?: () => void;
  close?: () => void;
  message?: string;
  hasModal: () => boolean;
}

/**
 * Initiate a modal
 *
 * @param {string} selector Select the html element to initiate the modal
 * @param {boolean} autoOpen Show modal when declared
 * @param {string} activeClass The class to open the modal
 * @param {boolean} debug Show errors on console
 * @return {Return} Return same heppers methods and a error message
 */

function initModal(options: ModalOptions): Return {
  const {
    selector: modalSelector = "",
    autoOpen = false,
    activeClass = "active",
    debug = true,
  } = options;
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
    return errorFactory(err.message, false, debug);
  }

  // validation
  const hasModalContainer = Boolean($modalContainer);
  if (!hasModalContainer) return errorMessageElement(modalSelector, debug);

  const hasBtnClose = Boolean($btnToCloseModal.length);
  if (!hasBtnClose) return errorMessageElement(closeSelector, debug);

  const hasWayToOpen = Boolean($btnToOpenModal.length) || autoOpen;
  if (!hasWayToOpen) return errorMessageOpen(debug);

  // auto open
  if (autoOpen) open();

  // listeners
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
    return errorFactory(message, false, debug);
  }
  function errorMessageOpen(debug: boolean) {
    const message = `There's no way to open modal. Set a data-modal-open attribute in the html or set the property activeModalOnLoad as true.`;
    return errorFactory(message, false, debug);
  }
  function errorFactory(
    message: string,
    hasModalContainer: boolean,
    errorDebug: boolean | undefined
  ) {
    Boolean(errorDebug) && console.error(message);
    return { message, hasModal: () => hasModalContainer };
  }

  return {
    open,
    close,
    hasModal,
  };
}

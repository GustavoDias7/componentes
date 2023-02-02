interface ModalOptions {
  selector: string;
  autoOpen?: boolean;
  activeClass?: string;
  debug?: boolean;
  closeOverlay?: boolean;
  beforeOpen?: () => void;
  afterOpen?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
}

interface Return {
  open?: () => void;
  close?: () => void;
  message?: string;
  hasModal: boolean;
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
    closeOverlay = true,
    beforeOpen,
    afterOpen,
    beforeClose,
    afterClose,
  } = options;
  // selectors
  let $modalContainer: HTMLElement | null = null;
  let $btnToOpenModal: NodeList | null = null;
  let $btnToCloseModal: NodeList | null = null;

  const openSelector = `[data-modal-open="${modalSelector}"]`;
  const closeSelector = `[data-modal-close="${modalSelector}"]`;

  try {
    $modalContainer = document.querySelector(modalSelector);
    $btnToOpenModal = document.querySelectorAll(openSelector);
    $btnToCloseModal = document.querySelectorAll(closeSelector);
  } catch (err) {
    if (err && err instanceof Error) {
      return errorFactory(err?.message, false, debug);
    }
  }

  // validation
  const isHTMLElement = $modalContainer instanceof HTMLElement;
  const hasModalContainer = Boolean($modalContainer);
  if (!hasModalContainer || !isHTMLElement)
    return errorMessageElement(modalSelector, debug);

  const hasBtnClose = Boolean($btnToCloseModal?.length);
  if (!hasBtnClose) return errorMessageElement(closeSelector, debug);

  // auto open
  if (autoOpen) open();

  // listeners
  if (closeOverlay) {
    $modalContainer?.addEventListener("click", (event: Event) => {
      const isOverlay = event.target === event.currentTarget;
      if (isOverlay) close();
    });
  }

  $btnToOpenModal?.forEach((event: EventTarget) => {
    event.addEventListener("click", open);
  });

  $btnToCloseModal?.forEach((event: EventTarget) => {
    event.addEventListener("click", close);
  });

  // functions
  function open(): void {
    if (beforeOpen) beforeOpen();
    $modalContainer?.classList.add(activeClass);
    if (afterOpen) afterOpen();
  }
  function close(): void {
    if (beforeClose) beforeClose();
    $modalContainer?.classList.remove(activeClass);
    if (afterClose) afterClose();
  }

  // errors
  function errorMessageElement(elementName: string, debug: boolean) {
    const message = `The element '${elementName}' does not exist!`;
    return errorFactory(message, false, debug);
  }
  function errorFactory(
    message: string,
    hasModalContainer: boolean,
    errorDebug: boolean | undefined
  ) {
    Boolean(errorDebug) && console.error(message);
    return { message, hasModal: hasModalContainer };
  }

  return {
    open,
    close,
    hasModal: hasModalContainer,
  };
}

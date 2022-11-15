/**
 * Initiate a modal
 *
 * @param {string} selector Select the html element to initiate the modal
 * @param {boolean} autoOpen Show modal when declared
 * @param {string} activeClass The class to open the modal
 * @param {boolean} debug Show errors on console
 * @return {Return} Return same heppers methods and a error message
 */
function initModal(options) {
    var _a = options.selector, modalSelector = _a === void 0 ? "" : _a, _b = options.autoOpen, autoOpen = _b === void 0 ? false : _b, _c = options.activeClass, activeClass = _c === void 0 ? "active" : _c, _d = options.debug, debug = _d === void 0 ? true : _d;
    // selectors
    var $modalContainer;
    var $btnToOpenModal;
    var $btnToCloseModal;
    var openSelector = "[data-modal-open=\"".concat(modalSelector, "\"]");
    var closeSelector = "[data-modal-close=\"".concat(modalSelector, "\"]");
    try {
        $modalContainer = document.querySelector(modalSelector);
        $btnToOpenModal = document.querySelectorAll(openSelector);
        $btnToCloseModal = document.querySelectorAll(closeSelector);
    }
    catch (err) {
        return errorFactory(err.message, false, debug);
    }
    // validation
    var hasModalContainer = Boolean($modalContainer);
    if (!hasModalContainer)
        return errorMessageElement(modalSelector, debug);
    var hasBtnClose = Boolean($btnToCloseModal.length);
    if (!hasBtnClose)
        return errorMessageElement(closeSelector, debug);
    var hasWayToOpen = Boolean($btnToOpenModal.length) || autoOpen;
    if (!hasWayToOpen)
        return errorMessageOpen(debug);
    // auto open
    if (autoOpen)
        open();
    // listeners
    $modalContainer.addEventListener("click", function (event) {
        var isOverlay = event.target === event.currentTarget;
        if (!isOverlay)
            return;
        $modalContainer.classList.remove(activeClass);
    });
    $btnToOpenModal.forEach(function (event) {
        event.addEventListener("click", open);
    });
    $btnToCloseModal.forEach(function (event) {
        event.addEventListener("click", close);
    });
    // functions
    function open() {
        $modalContainer.classList.add(activeClass);
    }
    function close() {
        $modalContainer.classList.remove(activeClass);
    }
    function hasModal() {
        return hasModalContainer;
    }
    // errors
    function errorMessageElement(elementName, debug) {
        var message = "The element '".concat(elementName, "' does not exist!");
        return errorFactory(message, false, debug);
    }
    function errorMessageOpen(debug) {
        var message = "There's no way to open modal. Set a data-modal-open attribute in the html or set the property activeModalOnLoad as true.";
        return errorFactory(message, false, debug);
    }
    function errorFactory(message, hasModalContainer, errorDebug) {
        Boolean(errorDebug) && console.error(message);
        return { message: message, hasModal: function () { return hasModalContainer; } };
    }
    return {
        open: open,
        close: close,
        hasModal: hasModal
    };
}

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
    var _a = options.selector, modalSelector = _a === void 0 ? "" : _a, _b = options.autoOpen, autoOpen = _b === void 0 ? false : _b, _c = options.activeClass, activeClass = _c === void 0 ? "active" : _c, _d = options.debug, debug = _d === void 0 ? true : _d, _e = options.closeOverlay, closeOverlay = _e === void 0 ? true : _e;
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
    // auto open
    if (autoOpen)
        open();
    // listeners
    if (closeOverlay) {
        $modalContainer.addEventListener("click", function (event) {
            var isOverlay = event.target === event.currentTarget;
            if (!isOverlay)
                return;
            $modalContainer.classList.remove(activeClass);
        });
    }
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

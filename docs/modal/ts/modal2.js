function errorMessageElement(elementName) {
    console.error("The element '".concat(elementName, "' does not exist!"));
    return false;
}
function errorMessageOpen() {
    console.error("There's no way to open modal. Set a data-modal-open attribute in the html or set the property activeModalOnLoad as true.");
    return false;
}
function handleTrigger(activeModalOnTrigger, activeClass) {
    var _a, _b;
    if (activeModalOnTrigger.enable) {
        var triggerSelector = (_a = activeModalOnTrigger === null || activeModalOnTrigger === void 0 ? void 0 : activeModalOnTrigger.elements) === null || _a === void 0 ? void 0 : _a.trigger;
        var $modalTrigger = document.querySelector(triggerSelector);
        var targetSelector = (_b = activeModalOnTrigger === null || activeModalOnTrigger === void 0 ? void 0 : activeModalOnTrigger.elements) === null || _b === void 0 ? void 0 : _b.target;
        var $modalTarget_1 = document.querySelector(targetSelector);
        var eventName = activeModalOnTrigger === null || activeModalOnTrigger === void 0 ? void 0 : activeModalOnTrigger.eventListener;
        if ($modalTrigger && $modalTarget_1 && eventName) {
            $modalTrigger.addEventListener(eventName, function (event) {
                if (event.target === event.currentTarget) {
                    $modalTarget_1.classList.add(activeClass);
                }
            });
        }
    }
}
function initModal(_a) {
    var _b = _a.modal, modal = _b === void 0 ? "" : _b, _c = _a.activeModalOnLoad, activeModalOnLoad = _c === void 0 ? false : _c, _d = _a.activeModalOnTrigger, activeModalOnTrigger = _d === void 0 ? {
        enable: false,
        elements: {
            trigger: "",
            target: ""
        },
        eventListener: "click"
    } : _d, _e = _a.activeClass, activeClass = _e === void 0 ? "active" : _e;
    // selectors
    var $modalContainer;
    var $btnToOpenModal;
    var $btnToCloseModal;
    var openSelector = "[data-modal-open=\"".concat(modal, "\"]");
    var closeSelector = "[data-modal-close=\"".concat(modal, "\"]");
    try {
        $modalContainer = document.querySelector(modal);
        $btnToOpenModal = document.querySelectorAll(openSelector);
        $btnToCloseModal = document.querySelectorAll(closeSelector);
    }
    catch (err) {
        console.error(err);
        return false;
    }
    // validation
    var hasModal = Boolean($modalContainer);
    if (!hasModal)
        return errorMessageElement(modal);
    var hasBtnClose = Boolean($btnToCloseModal.length);
    if (!hasBtnClose)
        return errorMessageElement(closeSelector);
    var hasWayToOpen = Boolean($btnToOpenModal.length) || activeModalOnLoad;
    if (!hasWayToOpen)
        return errorMessageOpen();
    // handles
    if (activeModalOnLoad)
        $modalContainer.classList.add(activeClass);
    $modalContainer.addEventListener("click", function (event) {
        if (event.target !== event.currentTarget)
            return;
        $modalContainer.classList.toggle(activeClass);
    });
    $btnToOpenModal.forEach(function (event) {
        event.addEventListener("click", function () {
            $modalContainer.classList.add(activeClass);
        });
    });
    $btnToCloseModal.forEach(function (event) {
        event.addEventListener("click", function () {
            $modalContainer.classList.remove(activeClass);
        });
    });
    handleTrigger(activeModalOnTrigger, activeClass);
    return true;
}
var $modals = document.querySelectorAll(".modal");
$modals.forEach(function (modal) {
    initModal({ modal: "#".concat(modal === null || modal === void 0 ? void 0 : modal.id) });
});

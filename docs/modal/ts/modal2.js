function initModal(_a) {
    var _b = _a.modal, modal = _b === void 0 ? "" : _b, _c = _a.activeModalOnLoad, activeModalOnLoad = _c === void 0 ? false : _c, _d = _a.activeModalOnTrigger, activeModalOnTrigger = _d === void 0 ? {
        enable: false,
        elements: {
            trigger: "",
            target: "",
        },
        eventListener: "click",
    } : _d, _e = _a.inactiveUser, inactiveUser = _e === void 0 ? { enable: false, maxIdleTime: 1000 } : _e, _f = _a.activeClass, activeClass = _f === void 0 ? "active" : _f;
    var $modalContainer = document.querySelector(modal);
    if (!$modalContainer)
        return;
    $modalContainer.addEventListener("click", function (event) {
        if (event.target !== event.currentTarget)
            return;
        $modalContainer.classList.toggle(activeClass);
    });
    var activeSelector = "[data-modal-active=\"".concat(modal, "\"]");
    var $btnToActiveModal = document.querySelectorAll(activeSelector);
    if (!$btnToActiveModal)
        return;
    $btnToActiveModal.forEach(function (event) {
        event.addEventListener("click", toggleModal);
    });
    var closeSelector = "[data-modal-close=\"".concat(modal, "\"]");
    var $btnToCloseModal = document.querySelectorAll(closeSelector);
    if (!$btnToCloseModal)
        return;
    $btnToCloseModal.forEach(function (event) {
        event.addEventListener("click", toggleModal);
    });
    function toggleModal(event) {
        if (event.target !== event.currentTarget)
            return;
        $modalContainer === null || $modalContainer === void 0 ? void 0 : $modalContainer.classList.toggle(activeClass);
    }
    if (activeModalOnLoad) {
        $modalContainer.classList.add(activeClass);
    }
    if (activeModalOnTrigger.enable) {
        var triggerSelector = activeModalOnTrigger.elements.trigger;
        var $modalTrigger = document.querySelector(triggerSelector);
        var targetSelector = activeModalOnTrigger.elements.target;
        var $modalTarget_1 = document.querySelector(targetSelector);
        if ($modalTrigger && $modalTarget_1) {
            var eventName = activeModalOnTrigger.eventListener;
            $modalTrigger.addEventListener(eventName, function (event) {
                if (event.target === event.currentTarget) {
                    $modalTarget_1.classList.add(activeClass);
                }
            });
        }
    }
    if (inactiveUser.enable) {
        var maxIdleTime_1 = inactiveUser.maxIdleTime;
        var timeout_1 = setTimeout(displayPopup, maxIdleTime_1);
        function displayPopup() {
            $modalContainer === null || $modalContainer === void 0 ? void 0 : $modalContainer.classList.add(activeClass);
        }
        var events = ["mousemove", "mouseDown", "click", "scroll", "keypress"];
        events.forEach(function (event) { return window.addEventListener(event, resetTimer); });
        function resetTimer() {
            clearTimeout(timeout_1);
            timeout_1 = setTimeout(displayPopup, maxIdleTime_1);
        }
    }
}
initModal({
    modal: "#modal1",
    inactiveUser: { enable: true, maxIdleTime: 2000 },
});

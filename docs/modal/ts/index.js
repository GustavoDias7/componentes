var $modals = document.querySelectorAll(".modal");
$modals.forEach(function (modal) {
    var modalInit = initModal({ modal: "#".concat(modal === null || modal === void 0 ? void 0 : modal.id) });
    if ((modal === null || modal === void 0 ? void 0 : modal.id) === "modal2")
        modalInit.open();
});

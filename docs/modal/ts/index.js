var $modals = document.querySelectorAll(".modal");
$modals.forEach(function (modal) {
    initModal({ modal: "#".concat(modal === null || modal === void 0 ? void 0 : modal.id) });
});

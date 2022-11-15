var $modals = document.querySelectorAll(".modal");
$modals.forEach(function (modal) {
    var modalInit = initModal({ selector: "#".concat(modal === null || modal === void 0 ? void 0 : modal.id) });
    if ((modal === null || modal === void 0 ? void 0 : modal.id) === "modal2")
        modalInit.open();
});
var modalInit = initModal({ selector: "#modalTest" });
if (!(modalInit === null || modalInit === void 0 ? void 0 : modalInit.hasModal()))
    console.log(modalInit.message);

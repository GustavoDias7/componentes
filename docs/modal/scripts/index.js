"use strict";
var $modals = document.querySelectorAll(".modal");
// $modals.forEach((modal) => {
//   const modalInit = initModal({
//     selector: `#${modal?.id}`,
//   });
//   if (modalInit.open && modal?.id === "modal2") modalInit.open();
// });
// const modalInit = initModal({ selector: `#modalTest` });
// if (!modalInit?.hasModal()) console.log(modalInit.message);
var modal1 = initModal({
    selector: "#modal1",
});
var modal2 = initModal({
    selector: "#modal2",
});
modal2.open && modal2.open();
var modalCallback = initModal({
    selector: "#modal3",
    beforeOpen: function () {
        console.log("before open callback");
    },
    afterOpen: function () {
        console.log("after open callback");
    },
    beforeClose: function () {
        console.log("before close callback");
    },
    afterClose: function () {
        console.log("after close callback");
    },
});

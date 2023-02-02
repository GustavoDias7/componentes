"use strict";
var modal1 = initModal({
    selector: "#modal1",
});
var modal2 = initModal({
    selector: "#modal2",
});
if (modal2.open)
    modal2.open();
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

"use strict";
function initInput() {
    var primaryInput = document.querySelectorAll(".primary-form .input");
    primaryInput.forEach(function (input) {
        input.addEventListener("input", function (e) {
            var hasValue = e.target.value.length;
            if (hasValue)
                e.target.classList.add("active");
            else
                e.target.classList.remove("active");
        });
    });
}
initInput();

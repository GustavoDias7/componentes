"use strict";
// 500 Mega = 500
// 1 Giga = 1.000
function formatSpeed(intMega) {
    function isThousand(number) {
        return number > 999;
    }
    function format(number) {
        var newNumber = isThousand(number) ? number / 1000 : number;
        var type = isThousand(number) ? "Giga" : "Mega";
        return "".concat(newNumber, " ").concat(type);
    }
    return format(intMega);
}
var result = formatSpeed(100000000000000);
console.log({ result: result });

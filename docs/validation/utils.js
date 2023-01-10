"use strict";
exports.__esModule = true;
exports.hasElements = exports.isNumericString = void 0;
var primitive_type_1 = require("./primitive-type");
var reference_type_1 = require("./reference-type");
function isNumericString(val) {
    var isStr = (0, primitive_type_1.isString)(val);
    if (isStr)
        return /^-?\d+$/.test(val);
    else
        return false;
}
exports.isNumericString = isNumericString;
function hasElements(val) {
    var isAnArray = (0, reference_type_1.isArray)(val);
    var isAString = (0, primitive_type_1.isString)(val);
    var isValidTypes = isAnArray || isAString;
    return isValidTypes && val.length > 0;
}
exports.hasElements = hasElements;

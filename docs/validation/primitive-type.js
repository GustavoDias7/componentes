"use strict";
// Primitive types
exports.__esModule = true;
exports.isBoolean = exports.isString = exports.isNumber = void 0;
function isNumber(val) {
    return typeof val === "number";
}
exports.isNumber = isNumber;
function isString(val) {
    return typeof val === "string";
}
exports.isString = isString;
function isBoolean(val) {
    return typeof val === "boolean";
}
exports.isBoolean = isBoolean;

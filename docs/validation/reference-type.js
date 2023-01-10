"use strict";
exports.__esModule = true;
exports.isDate = exports.isArray = exports.isObject = void 0;
function isObject(val) {
    var isObj = typeof val === "object";
    var isObjContructor = val.constructor === Object;
    return val && isObj && isObjContructor;
}
exports.isObject = isObject;
function isArray(val) {
    return Array.isArray(val);
}
exports.isArray = isArray;
function isDate(val) {
    return true;
}
exports.isDate = isDate;

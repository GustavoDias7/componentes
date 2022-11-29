// Primitive types
function isNumber(val) {
    return typeof val === "number";
}
function isString(val) {
    return typeof val === "string";
}
function isBoolean(val) {
    return typeof val === "boolean";
}
// Utils
// Should be a string
// All characters of the string should be numeric
// Example: "1234" => true
// Example: "abc123" => false
function isNumericString(val) {
    var isStr = isString(val);
    if (isStr)
        return /^-?\d+$/.test(val);
    else
        return false;
}

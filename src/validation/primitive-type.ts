// Primitive types

function isNumber(val: any): boolean {
  return typeof val === "number";
}
function isString(val: any): boolean {
  return typeof val === "string";
}
function isBoolean(val: any): boolean {
  return typeof val === "boolean";
}

export { isNumber, isString, isBoolean };

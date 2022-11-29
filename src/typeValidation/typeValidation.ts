// Primitive types

function isNumber(val: any): boolean {
  return typeof val === "number";
}
function isString(val: any): boolean {
  return typeof val === "string";
}
function isBoolean(val: any) {
  return typeof val === "boolean";
}

// Utils

// Should be a string
// All characters of the string should be numeric
// Example: "1234" => true
// Example: "abc123" => false

function isNumericString(val: string) {
  const isStr = isString(val);
  if (isStr) return /^-?\d+$/.test(val);
  else return false;
}

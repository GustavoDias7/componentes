function isObject(val: any) {
  const isObj = typeof val === "object";
  const isObjContructor = val.constructor === Object;
  return val && isObj && isObjContructor;
}
function isArray(val: any): boolean {
  return Array.isArray(val);
}
function isDate(val: any): boolean {
  return true;
}

export { isObject, isArray, isDate };

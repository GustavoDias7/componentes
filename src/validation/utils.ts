import { isString } from "./primitive-type";
import { isArray } from "./reference-type";

function isNumericString(val: string): boolean {
  const isStr = isString(val);
  if (isStr) return /^-?\d+$/.test(val);
  else return false;
}

function hasElements(val: string) {
  const isAnArray = isArray(val);
  const isAString = isString(val);
  const isValidTypes = isAnArray || isAString;

  return isValidTypes && val.length > 0;
}

export { isNumericString, hasElements };

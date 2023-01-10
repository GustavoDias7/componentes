"use strict";
// function errorMessageElement(elementName: string) {
//   console.error(`The element '${elementName}' does not exist!`);
//   return false;
// }
// function newJoinedDigit(
//   currValue: string,
//   currDigit: string,
//   indexCurrDigit: number
// ) {
//   let newValue = "";
//   for (let index = 0; index < currValue.length; index++) {
//     const element = currValue[index];
//     const isCurrentDigitToAdd = index === indexCurrDigit;
//     newValue += isCurrentDigitToAdd ? currDigit : element;
//   }
//   return newValue;
// }
// function setOneChar(value: string | null) {
//   // limit digits to 1 character
//   if (value === null) return "";
//   return Boolean(value) ? value[value.length - 1] : "";
// }
// function isEmptyString(value: string) {
//   if (typeof value === "string") {
//     return value.length === 0;
//   } else {
//     throw TypeError("It's not a string");
//   }
// }
// function isNumber(value: string) {
//   const numberRegex = /^\d+$/;
//   return numberRegex.test(value);
// }
// function setSpaces(length: number) {
//   let spaces = "";
//   for (let index = 0; index < length; index++) {
//     spaces += " ";
//   }
//   return spaces;
// }
// function isSpace(value: string) {
//   return value === " ";
// }
// function handleInputDigits({ fieldSelector = "", fieldHiddenSelector = "" }) {
//   // selectors
//   let $fields: NodeListOf<HTMLInputElement>;
//   let $fieldHidden: HTMLInputElement | null;
//   try {
//     // get invalid selectors
//     $fields = document.querySelectorAll(fieldSelector);
//     $fieldHidden = document.querySelector(fieldHiddenSelector);
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
//   // validations of elements
//   const hasFields = Boolean($fields.length);
//   if (!hasFields) return errorMessageElement(fieldSelector);
//   const fieldHidden = Boolean($fieldHidden);
//   const isFieldHiddenHTML = $fieldHidden instanceof HTMLInputElement;
//   if (!fieldHidden || !isFieldHiddenHTML)
//     return errorMessageElement(fieldHiddenSelector);
//   let fieldHiddenValue: string = setSpaces($fields.length);
//   // set spaces to the hidden value
//   if ($fieldHidden) $fieldHidden.value = fieldHiddenValue;
//   console.log({ $fields });
//   $fields.forEach(
//     (
//       field: HTMLInputElement,
//       fieldIndex: number,
//       arr: NodeListOf<HTMLInputElement>
//     ) => {
//       // set empty value at first time
//       // reset value when refresh page
//       field.value = "";
//       field.addEventListener("input", (e: InputEvent) => {
//         if (e.target instanceof HTMLInputElement) {
//           const oneDigit = setOneChar(e.data);
//           // mask
//           if (isNumber(oneDigit)) e.target.value = oneDigit;
//           else if (isEmptyString(oneDigit)) e.target.value = "";
//           else {
//             // is letter
//             if (isSpace(fieldHiddenValue[fieldIndex])) e.target.value = "";
//             else e.target.value = fieldHiddenValue[fieldIndex];
//           }
//           const currDigit = e.target.value;
//           const isEmptyDigit = isEmptyString(currDigit);
//           if (!isEmptyDigit) {
//             fieldHiddenValue = newJoinedDigit(
//               fieldHiddenValue,
//               currDigit,
//               fieldIndex
//             );
//             $fieldHidden.value = fieldHiddenValue;
//             const isLastField = fieldIndex === arr.length - 1;
//             if (!isLastField) arr[fieldIndex + 1].focus();
//           } else {
//             fieldHiddenValue = newJoinedDigit(
//               fieldHiddenValue,
//               " ",
//               fieldIndex
//             );
//             $fieldHidden.value = fieldHiddenValue;
//           }
//         }
//       });
//       field.addEventListener("keydown", (e: KeyboardEvent) => {
//         if (e.target instanceof HTMLInputElement) {
//           const isBackSpace = e.key === "Backspace";
//           const isEmptyStr = isEmptyString(e.target.value);
//           const isFirstField = fieldIndex === 0;
//           if (isBackSpace && isEmptyStr && !isFirstField) {
//             setTimeout(() => {
//               arr[fieldIndex - 1].focus();
//             }, 10);
//           }
//         }
//       });
//     }
//   );
// }
// handleInputDigits({
//   fieldSelector: ".digit",
//   fieldHiddenSelector: "#digits",
// });

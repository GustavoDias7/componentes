function hasElement(element, elementSelector = "") {
  if (Boolean(element)) {
    return true;
  } else {
    console.log(`The selector "${elementSelector}" not exist!`);
    return false;
  }
}

function errorMessageElement(elementName) {
  console.error(`The element '${elementName}' does not exist!`);
  return false;
}

function newJoinedDigit(currValue, currDigit, indexCurrDigit) {
  let newValue = "";

  for (let index = 0; index < currValue.length; index++) {
    const element = currValue[index];
    const isCurrentDigitToAdd = index === indexCurrDigit;
    newValue += isCurrentDigitToAdd ? currDigit : element;
  }

  return newValue;
}

function setOneChar(value) {
  // limit digits to 1 character
  return Boolean(value) ? value[value.length - 1] : "";
}

function isEmptyString(value) {
  if (typeof value === "string") {
    return value.length === 0;
  } else {
    throw TypeError("It's not a string");
  }
}

function isNumber(value) {
  const numberRegex = /^\d+$/;
  return numberRegex.test(value);
}

function setSpaces(length) {
  return " ".repeat(length);
}

function isSpace(value) {
  return value === " ";
}

function handleInputDigits({ fieldSelector = "", fieldHiddenSelector = "" }) {
  // selectors
  let $fields;
  let $fieldHidden;

  try {
    $fields = document.querySelectorAll(fieldSelector);
    $fieldHidden = document.querySelector(fieldHiddenSelector);
  } catch (err) {
    console.error(err);
    return false;
  }

  // validation
  const hasFields = Boolean($fields.length);
  if (!hasFields) return errorMessageElement(fieldSelector);

  const fieldHidden = Boolean($fields);
  if (!fieldHidden) return errorMessageElement(fieldHiddenSelector);

  let fieldHiddenValue = setSpaces($fields.length);
  // set spaces to the hidden value
  $fieldHidden.value = fieldHiddenValue;

  $fields.forEach((field, fieldIndex, arr) => {
    // set empty value at first time
    // reset values when refresh page
    field.value = "";

    field.addEventListener("input", (e) => {
      const oneDigit = setOneChar(e.data);

      if (isNumber(oneDigit)) {
        e.target.value = oneDigit;
      } else if (isEmptyString(oneDigit)) {
        e.target.value = "";
      } else {
        if (isSpace(fieldHiddenValue[fieldIndex])) {
          e.target.value = "";
        } else {
          e.target.value = fieldHiddenValue[fieldIndex];
        }
      }

      const currDigit = e.target.value;

      const isEmptyDigit = isEmptyString(currDigit);
      if (!isEmptyDigit) {
        fieldHiddenValue = newJoinedDigit(
          fieldHiddenValue,
          currDigit,
          fieldIndex
        );
        $fieldHidden.value = fieldHiddenValue;
        const isLastField = fieldIndex === arr.length - 1;
        if (!isLastField) arr[fieldIndex + 1].focus();
      } else {
        fieldHiddenValue = newJoinedDigit(fieldHiddenValue, " ", fieldIndex);
        $fieldHidden.value = fieldHiddenValue;
      }
    });

    field.addEventListener("keydown", (e) => {
      const isBackSpace = e.key === "Backspace";
      const isEmptyStr = isEmptyString(e.target.value);
      const isFirstField = fieldIndex === 0;

      if (isBackSpace && isEmptyStr && !isFirstField) {
        setTimeout(() => {
          arr[fieldIndex - 1].focus();
        }, 10);
      }
    });
  });
}

handleInputDigits({
  fieldSelector: "input.digit",
  fieldHiddenSelector: "input#digits",
});

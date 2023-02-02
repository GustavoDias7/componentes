"use strict";
function errorMessageElement(elementName) {
    console.error("The element '".concat(elementName, "' does not exist!"));
    return false;
}
function newJoinedDigit(currValue, currDigit, indexCurrDigit) {
    var newValue = "";
    for (var index = 0; index < currValue.length; index++) {
        var element = currValue[index];
        var isCurrentDigitToAdd = index === indexCurrDigit;
        newValue += isCurrentDigitToAdd ? currDigit : element;
    }
    return newValue;
}
function setOneChar(value) {
    // limit digits to 1 character
    if (value === null)
        return "";
    return Boolean(value) ? value[value.length - 1] : "";
}
function isEmptyString(value) {
    if (typeof value === "string") {
        return value.length === 0;
    }
    else {
        throw TypeError("It's not a string");
    }
}
function isNumber(value) {
    var numberRegex = /^\d+$/;
    return numberRegex.test(value);
}
function setSpaces(length) {
    var spaces = "";
    for (var index = 0; index < length; index++) {
        spaces += " ";
    }
    return spaces;
}
function isSpace(value) {
    return value === " ";
}
function handleInputDigits(_a) {
    var _b = _a.fieldSelector, fieldSelector = _b === void 0 ? "" : _b, _c = _a.fieldHiddenSelector, fieldHiddenSelector = _c === void 0 ? "" : _c, _d = _a.debug, debug = _d === void 0 ? false : _d;
    // selectors
    var $fields;
    var $fieldHidden;
    try {
        // get invalid selectors
        $fields = document.querySelectorAll(fieldSelector);
        $fieldHidden = document.querySelector(fieldHiddenSelector);
    }
    catch (err) {
        console.error(err);
        return false;
    }
    // validations of elements
    var hasFields = Boolean($fields.length);
    if (!hasFields)
        return errorMessageElement(fieldSelector);
    var fieldHidden = Boolean($fieldHidden);
    var isFieldHiddenHTML = $fieldHidden instanceof HTMLInputElement;
    if (!fieldHidden || !isFieldHiddenHTML)
        return errorMessageElement(fieldHiddenSelector);
    var fieldHiddenValue = setSpaces($fields.length);
    // set spaces to the hidden value
    if ($fieldHidden)
        $fieldHidden.value = fieldHiddenValue;
    $fields.forEach(function (field, fieldIndex, arr) {
        // set empty value at first time
        // reset value when refresh page
        field.value = "";
        field.addEventListener("input", function (e) {
            if (typeof InputEvent !== "undefined" && e instanceof InputEvent) {
                if (e.target instanceof HTMLInputElement) {
                    var oneDigit = setOneChar(e.data);
                    // mask
                    if (isNumber(oneDigit))
                        e.target.value = oneDigit;
                    else if (isEmptyString(oneDigit))
                        e.target.value = "";
                    else {
                        // is letter
                        if (isSpace(fieldHiddenValue[fieldIndex]))
                            e.target.value = "";
                        else
                            e.target.value = fieldHiddenValue[fieldIndex];
                    }
                    var currDigit = e.target.value;
                    var isEmptyDigit = isEmptyString(currDigit);
                    if (!isEmptyDigit) {
                        fieldHiddenValue = newJoinedDigit(fieldHiddenValue, currDigit, fieldIndex);
                        $fieldHidden && ($fieldHidden.value = fieldHiddenValue);
                        var isLastField = fieldIndex === arr.length - 1;
                        if (!isLastField)
                            arr[fieldIndex + 1].focus();
                    }
                    else {
                        fieldHiddenValue = newJoinedDigit(fieldHiddenValue, " ", fieldIndex);
                        $fieldHidden && ($fieldHidden.value = fieldHiddenValue);
                    }
                }
            }
        });
        field.addEventListener("keydown", function (e) {
            if (e.target instanceof HTMLInputElement) {
                var isBackSpace = e.key === "Backspace";
                var isEmptyStr = isEmptyString(e.target.value);
                var isFirstField = fieldIndex === 0;
                if (isBackSpace && isEmptyStr && !isFirstField) {
                    setTimeout(function () {
                        arr[fieldIndex - 1].focus();
                    }, 10);
                }
            }
        });
    });
}
handleInputDigits({
    fieldSelector: ".digit",
    fieldHiddenSelector: "#digits",
});

function validation({ initialValues = {}, initialErrors = {}, schemas }) {
  const states = {
    values: { ...initialValues },
    errors: {},
    isValid: {},
    isTouched: {},
    isValidForm: false,
  };

  for (const key in states.values) {
    states.errors[key] = initialErrors[key] || null;
    states.isValid[key] = false;
    states.isTouched[key] = false;
  }

  function setValue(name, val) {
    states.values = { ...states.values, [name]: val };
  }
  function setError(name, val) {
    states.errors = { ...states.errors, [name]: val };
  }
  function setIsValid(name, val) {
    states.isValid = { ...states.isValid, [name]: val };
  }
  function setIsTouched(name, val) {
    states.isTouched = { ...states.isTouched, [name]: val };
  }
  function setIsValidForm() {
    states.isValidForm = Object.entries(states.isValid).every((val) => val[1]);
  }

  function onChange({ target }) {
    if (states.isTouched) validate(target.name, target.value);
    setValue(target.name, target.value);
  }

  function onBlur({ target }) {
    if (!states.isTouched[target.name]) setIsTouched(target.name, true);
    validate(target.name, states.values[target.name]);
  }

  function onCheck({ target }) {
    validate(target.name, target.checked);
    setValue(target.name, target.checked);
  }

  function validate(type, value) {
    if (Boolean(schemas[type]) === false) {
      setIsValid(type, true);
      setIsValidForm();
    } else if (value.length === 0) {
      // it has no value
      setError(type, "Preencha um valor");
      setIsValid(type, false);
      setIsValidForm();
    } else if (schemas[type] && !schemas[type].validation(value)) {
      // is not valid
      setError(type, schemas[type].message);
      setIsValid(type, false);
      setIsValidForm();
    } else {
      // is valid
      setError(type, null);
      setIsValid(type, true);
      setIsValidForm();
    }
  }

  return {
    setValue,
    setError,
    setIsValid,
    setIsTouched,
    setIsValidForm,
    onChange,
    onBlur,
    onCheck,
    isValidForm: () => states.isValidForm,
    values: () => states.values,
    value: (name) => states.values[name],
    errors: (name) => states.errors[name],
    isValid: (name) => states.isValid[name],
    isTouched: (name) => states.isTouched[name],
    validate: (type) => validate(type, states.values[type]),
  };
}

function setErrorMessage(fieldName = "", message, isValid, classNames) {
  const errorId = `${fieldName}-error-message`;
  const $err = document.querySelector(`#${errorId}`);
  const $field = document.querySelector(`input[name='${fieldName}']`);

  if ($err && isValid) {
    $err.remove();
  } else if ($err && !isValid) {
    if ($err.innerText !== message) $err.innerText = message;
  } else if (!$err && !isValid && message) {
    // create error element
    const $error = document.createElement("p");
    $error.classList.add("helper-text", classNames.error);
    $error.innerText = message;
    $error.id = errorId;

    // where to create the error element
    if ($field.parentElement.classList.contains("input-container")) {
      $field.parentElement.after($error);
    } else if ($field.type === "checkbox") {
      $field.parentElement.after($error);
    } else {
      $field.after($error);
    }
  }
}

function setClass(fieldName = "", isValid, classNames) {
  const $field = document.querySelector(`input[name='${fieldName}']`);
  if (isValid) {
    $field.classList.remove(classNames.error);
    $field.classList.add(classNames.valid);
  } else {
    $field.classList.remove(classNames.valid);
    $field.classList.add(classNames.error);
  }
}

function setDisabledButton(isFormValid, formId, buttonSelector) {
  const $button = document.querySelector(`#${formId} ${buttonSelector}`);
  $button.disabled = !isFormValid;
}

function formBuilder({
  initialValues = {},
  initialErrors = {},
  indexToValidate = {},
  schemas = {},
  classNames = { error: "error", valid: "success" },
  formId = "",
  formButton = { selector: "button", disabled: true },
  onFormSubmit = null,
}) {
  const fields = Object.entries(initialValues).map((val) => val[0]);
  const {
    setError,
    setIsValid,
    setIsTouched,
    onChange,
    onBlur,
    onCheck,
    errors,
    isValid,
    isTouched,
    isValidForm,
    values,
    validate,
  } = validation({ initialValues, schemas });
  if (formButton.disabled)
    setDisabledButton(isValidForm(), formId, formButton.selector);

  fields.forEach((fieldName) => {
    if (initialErrors[fieldName]?.length > 0) {
      setIsTouched(fieldName, true);
      setError(initialErrors[fieldName]);
      setErrorMessage(
        fieldName,
        initialErrors[fieldName],
        isValid(fieldName),
        classNames
      );
      if (formButton.disabled)
        setDisabledButton(isValidForm(), formId, formButton.selector);
      setClass(fieldName, isValid(fieldName), classNames);
    }

    const $field = document.querySelector(`input[name='${fieldName}']`);

    if ($field.type !== "checkbox") {
      $field.value = initialValues[fieldName];
      $field.addEventListener("input", (event) => {
        if (event.target.value.length === indexToValidate[fieldName]) {
          setIsTouched(fieldName, true);
        }
        onChange(event);
        if (isTouched(fieldName)) {
          setErrorMessage(
            fieldName,
            errors(fieldName),
            isValid(fieldName),
            classNames
          );
          setClass(fieldName, isValid(fieldName), classNames);
        }
        if (formButton.disabled)
          setDisabledButton(isValidForm(), formId, formButton.selector);
      });

      $field.addEventListener("blur", (event) => {
        onBlur(event);
        setErrorMessage(
          fieldName,
          errors(fieldName),
          isValid(fieldName),
          classNames
        );
        setClass(fieldName, isValid(fieldName), classNames);
        if (formButton.disabled)
          setDisabledButton(isValidForm(), formId, formButton.selector);
      });
    } else if ($field.type === "checkbox") {
      $field.checked = initialValues[fieldName];
      if (!schemas[fieldName]) {
        setIsTouched(fieldName, true);
        setIsValid(fieldName, true);
      }
      $field.addEventListener("input", (event) => {
        onCheck(event);
        if (schemas[fieldName]) {
          setErrorMessage(
            fieldName,
            errors(fieldName),
            isValid(fieldName),
            classNames
          );
        }
        if (formButton.disabled)
          setDisabledButton(isValidForm(), formId, formButton.selector);
      });
    }
  });

  const $form = document.getElementById(formId);
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    fields.forEach((fieldName) => {
      if (!isValid(fieldName)) {
        setIsTouched(fieldName, true);
        validate(fieldName);
        setErrorMessage(
          fieldName,
          errors(fieldName),
          isValid(fieldName),
          classNames
        );
        setClass(fieldName, isValid(fieldName), classNames);
      }
    });
    if (onFormSubmit) onFormSubmit(isValidForm() ? values() : null);
  });
}

module.exports = formBuilder;

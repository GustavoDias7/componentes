function validation(type) {
  let value = "";
  let error = null;
  let isValid = false;
  let isTouched = false;

  const setValue = (val) => (value = val);
  const setError = (val) => (error = val);
  const setIsValid = (val) => (isValid = val);
  const setIsTouched = (val) => (isTouched = val);

  function onChange({ target }) {
    if (isTouched) validate(target.value);
    setValue(target.value);
  }

  function onBlur() {
    if (!isTouched) setIsTouched(true);
    return validate(value);
  }

  function validate(value) {
    if (type === false) {
      setIsValid(true);
      return true;
    }

    if (value.length === 0) {
      // it has no value
      setError("Preencha um valor");
      setIsValid(false);
      return false;
    } else if (types[type] && !types[type].validation(value)) {
      // is not valid
      setError(types[type].message);
      setIsValid(false);
      return false;
    } else {
      // is valid
      setError(null);
      setIsValid(true);
      return true;
    }
  }

  return {
    setValue,
    setError,
    setIsValid,
    setIsTouched,
    onChange,
    onBlur,
    value: () => value,
    isValid: () => isValid,
    isTouched: () => isTouched,
    error: () => error,
    validate: () => validate(value),
  };
}

function setErrorMessage(fieldName = "", message, isValid) {
  const errorId = `${fieldName}-error-message`;
  const $err = document.querySelector(`#${errorId}`);
  const $field = document.querySelector(`input[name='${fieldName}']`);

  if ($err && isValid) {
    $err.remove();
  } else if ($err && !isValid) {
    if ($err.innerText !== message) $err.innerText = message;
  } else if (!$err && !isValid && message !== null) {
    // create error element
    const $error = document.createElement("p");
    $error.classList.add("helper-text", "error");
    $error.innerText = message;
    $error.id = errorId;
    // where to create the error element
    $field.after($error);
  }
}

function setClass(fieldName = "", isValid) {
  const $field = document.querySelector(`input[name='${fieldName}']`);
  if (isValid) {
    $field.classList.remove("error");
    $field.classList.add("success");
  } else {
    $field.classList.remove("success");
    $field.classList.add("error");
  }
}

function handleField({
  fieldName = "",
  initialError = "",
  indexToValidate = -1,
}) {
  const $field = document.querySelector(`input[name='${fieldName}']`);
  const {
    setError,
    setIsTouched,
    onChange,
    onBlur,
    error,
    isValid,
    isTouched,
  } = validation(fieldName);

  if (initialError?.length > 0) {
    setIsTouched(true);
    setError(initialError);
    setErrorMessage(fieldName, initialError, isValid());
    setClass(fieldName, isValid());
  }

  $field.addEventListener("input", (event) => {
    if (event.target.value.length === indexToValidate) setIsTouched(true);
    onChange(event);
    setErrorMessage(fieldName, error(), isValid());
    if (isTouched()) setClass(fieldName, isValid());
  });

  $field.addEventListener("blur", () => {
    onBlur();
    setErrorMessage(fieldName, error(), isValid());
    setClass(fieldName, isValid());
  });

  return { isValid };
}

function handleDigits({
  fieldName = "",
  selector = "input.digit",
  initialError = "",
}) {
  const $button = document.querySelector("#validate-digits");
  const $field = document.querySelector(`input[name='${fieldName}']`);
  const $digits = document.querySelectorAll(selector);
  const {
    setValue,
    setError,
    setIsTouched,
    validate,
    error,
    isValid,
    isTouched,
  } = validation(fieldName);

  if (initialError) {
    setIsTouched(true);
    setError(initialError);
    setErrorMessage(fieldName, initialError, isValid());
    setClass(fieldName, isValid());
  }

  $digits.forEach(($digit) => {
    $digit.addEventListener("input", () => {
      setValue($field.value.trim());
      validate();
      if (isTouched()) {
        setErrorMessage(fieldName, error(), isValid());
        setClass(fieldName, isValid());
      }
      $button.disabled = !isValid();
    });
  });
}

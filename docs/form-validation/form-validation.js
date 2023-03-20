const types = {
  email: {
    validation(value) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value);
    },
    message: "Preencha um email válido",
  },
  password: {
    validation(value) {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(value);
    },
    message:
      "Mínimo de 8 caractéres, no mínimo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 carácter especial:",
  },
  number: {
    validation(value) {
      const regex = /^\d+$/;
      return regex.test(value);
    },
    message: "Utilize apenas números",
  },
  cpf: {
    validation(value) {
      let cpf = value.replace(/[^\d]+/g, "");
      if (cpf === "") return false;
      // Elimina CPFs invalidos conhecidos
      if (
        cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
      )
        return false;
      // Valida 1o digito
      let add = 0;
      for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(cpf.charAt(9))) return false;
      // Valida 2o digito
      add = 0;
      for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(cpf.charAt(10))) return false;
      return true;
    },
    message: "Insira um cpf válido",
  },
  digits: {
    validation(value) {
      let result = false;

      const isStr = typeof value === "string";
      if (isStr) {
        const isNumeric = /^-?\d+$/.test(value);
        if (isNumeric) {
          const num = Number(value);
          if (num > 99) {
            if (num === clientCPFDigits) {
              result = true;
            }
          }
        }
      }

      return result;
    },
    message: "Digitos inválidos",
  },
};

function validation(type) {
  let value = "";
  let error = "";

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].validation(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  function setValue(val) {
    value = val;
  }

  function setError(val) {
    error = val;
  }

  return {
    value: () => value,
    setValue,
    setError,
    onChange,
    error: () => error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}

function setError(fieldName = "", fieldValidation) {
  const errorId = `${fieldName}-error-message`;
  const $errorMessage = document.querySelector(`#${errorId}`);
  const $field = document.querySelector(`input[name='${fieldName}']`);

  if (!fieldValidation.value() && !fieldValidation.error()) {
    $field.classList.remove("valid");
  }
  if ($errorMessage && !fieldValidation.error()) {
    $errorMessage.remove();
    $field.classList.remove("error");
    $field.classList.add("valid");
  } else if ($errorMessage && fieldValidation.error()) {
    if ($errorMessage.innerText !== fieldValidation.error()) {
      $errorMessage.innerText = fieldValidation.error();
    }
    $field.classList.remove("valid");
    $field.classList.add("error");
  } else if (!$errorMessage && fieldValidation.error()) {
    // error element
    const $error = document.createElement("p");
    $error.classList.add("helper-text", "error");
    $error.innerText = fieldValidation.error();
    $error.id = errorId;

    // where to create the error element
    $field.after($error);
    $field.classList.remove("valid");
    $field.classList.add("error");
  }
}

function handleField(fieldName = "") {
  const $field = document.querySelector(`input[name='${fieldName}']`);
  const fieldValidation = validation(fieldName);

  $field.addEventListener("input", (event) => {
    fieldValidation.onChange(event);
    setError(fieldName, fieldValidation);
  });

  $field.addEventListener("blur", () => {
    fieldValidation.onBlur();
    setError(fieldName, fieldValidation);
  });
}

function handleDigits(fieldName = "") {
  const $button = document.querySelector("#validate-digits");
  const $field = document.querySelector(`input[name='${fieldName}']`);
  const $digits = document.querySelectorAll("input.digit");
  const fieldValidation = validation(fieldName);
  fieldValidation.setError("Initial error message");

  $digits.forEach(($digit) => {
    $digit.addEventListener("input", () => {
      fieldValidation.setValue($field.value);
      const isValid = fieldValidation.validate();
      $button.disabled = !isValid;

      const hasThree = $field.value.trim().length === 3;
      if (hasThree) {
        setError(fieldName, fieldValidation);
      }
    });
  });
}

handleField("cpf");
handleDigits("digits");

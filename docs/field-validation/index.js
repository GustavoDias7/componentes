var element = document.querySelector("input[name='cpf']");
var maskOptions = {
  mask: "000.000.000-00",
};
var mask = IMask(element, maskOptions);

handleField({
  fieldName: "cpf",
  initialError: "Initial error",
  indexToValidate: 14,
});

handleDigits({
  fieldName: "digits",
  // initialError: "Initial error",
});

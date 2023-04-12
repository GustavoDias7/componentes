var element = document.querySelector("input[name='cpf']");
var maskOptions = {
  mask: "000.000.000-00",
};
var mask = IMask(element, maskOptions);

formBuilder({
  initialValues: {
    email: "",
    number: "",
    cpf: "",
  },
  initialErrors: {},
  indexToValidate: { number: 4, cpf: 14 },
});

// handleField({
//   fieldName: "cpf",
//   // initialError: "Initial error",
//   indexToValidate: 14,
// });

// handleDigits({
//   fieldName: "digits",
//   // initialError: "Initial error",
// });

var element = document.querySelector("input[name='cpf']");
var maskOptions = {
  mask: "000.000.000-00",
};
var mask = IMask(element, maskOptions);

window.formBuilder({
  initialValues: {
    email: "",
    number: "",
    cpf: "",
  },
  initialErrors: {
    email: "",
    number: "",
    cpf: "",
  },
  schemas: window.schemas.types,
  indexToValidate: { number: 4, cpf: 14 },
  formId: "form-id",
  formButton: { selector: "button", disabled: true },
  onFormSubmit: (values) => console.log(values),
});

window.initInput({ selector: ".input.filled, .input.outline" });

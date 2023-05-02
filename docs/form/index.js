window.form({
  formSelector: "#form-js",
  fields: [
    {
      name: "name",
      id: "name",
      label: "Name",
      type: "text",
    },
    { name: "age", id: "age", variant: "filled", label: "Age", type: "text" },
    { name: "cpf", id: "cpf", variant: "outline", label: "CPF", type: "text" },
    {
      name: "right",
      label: "Right element",
      type: "text",
      rightElement: true,
    },
    {
      name: "right-filled",
      variant: "filled",
      label: "Right element + filed",
      type: "text",
      rightElement: true,
    },
    {
      name: "right-outline",
      variant: "outline",
      label: "Right element + outline",
      type: "text",
      rightElement: true,
    },
    {
      name: "check",
      label: "Checkbox",
      type: "checkbox",
    },
    {
      name: "name",
      id: "name",
      label: "Name",
      type: "text",
      disabled: true,
    },
    {
      name: "age",
      id: "age",
      variant: "filled",
      label: "Age",
      type: "text",
      disabled: true,
    },
    {
      name: "age",
      id: "age",
      variant: "filled",
      label: "Age",
      type: "text",
      disabled: true,
      active: true,
    },
    {
      name: "cpf",
      id: "cpf",
      variant: "outline",
      label: "CPF",
      type: "text",
      disabled: true,
    },
    {
      name: "cpf",
      id: "cpf",
      variant: "outline",
      label: "CPF",
      type: "text",
      disabled: true,
      active: true,
    },
    {
      name: "name",
      id: "name",
      label: "Name",
      type: "text",
      errorMessage: "Initial name error",
    },
    {
      name: "age",
      id: "age",
      variant: "filled",
      label: "Age",
      type: "text",
      errorMessage: "Initial age error",
    },
    {
      name: "cpf",
      id: "cpf",
      variant: "outline",
      label: "CPF",
      type: "text",
      errorMessage: "Initial CPF error",
    },
    {
      name: "name",
      id: "name",
      label: "Name",
      type: "text",
      disabled: true,
      errorMessage: "Initial name error",
    },
    {
      name: "age",
      id: "age",
      variant: "filled",
      label: "Age",
      type: "text",
      disabled: true,
      errorMessage: "Initial age error",
    },
    {
      name: "cpf",
      id: "cpf",
      variant: "outline",
      label: "CPF",
      type: "text",
      disabled: true,
      errorMessage: "Initial CPF error",
    },
  ],
});

const formHtmlCode = document.querySelector("#form-code");
const form = document.querySelector("#form-js");
formHtmlCode.innerText = form.outerHTML;

window.initInput({ selector: ".input.filled, .input.outline" });

window.formBuilder({
  initialValues: {
    right: "",
    "right-filled": "",
    "right-outline": "",
  },
  initialErrors: {},
  schemas: {
    right: { validation: () => false },
    "right-filled": { validation: () => false },
    "right-outline": { validation: () => false },
  },
  formId: "form-js",
  formButton: "button",
});

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

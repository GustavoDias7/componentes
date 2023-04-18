window.initInput({ selector: ".input.filled, .input.outline" });

window.formBuilder({
  initialValues: {
    right: "",
  },
  initialErrors: {},
  schemas: {
    right: {
      validation: () => true,
    },
  },
  formId: "form-id",
  formButton: "button",
});

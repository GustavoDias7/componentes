function initInput() {
  const primaryInput = document.querySelectorAll(".primary-form .input");
  primaryInput.forEach((input) => {
    input.addEventListener("input", (e: any) => {
      const hasValue = e.target.value.length;
      if (hasValue) e.target.classList.add("active");
      else e.target.classList.remove("active");
    });
  });
}
initInput();

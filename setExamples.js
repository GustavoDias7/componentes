async function setCSS(path) {
  const cssFile = await fetch(path);
  const cssFileText = await cssFile.text();
  const codeCSS = document.querySelector(".code-css");
  codeCSS.textContent = cssFileText;
}
function setHTML(componentSelector) {
  const $componentSelector = document.querySelector(componentSelector);
  const codeHTML = document.querySelector(".code-html");
  console.log($componentSelector);
  codeHTML.textContent = $componentSelector.outerHTML;
}

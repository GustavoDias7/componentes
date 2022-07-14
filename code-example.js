const regexp = /{/;
const regexp2 = /[;]/g;
const regexp3 = /    }/;
function filter_css_text(css) {
  const texts = [];
  for (let i = css.rules[0]; i <= css.rules[1]; i++) {
    texts.push(style[css.cssFile].cssRules[i].cssText);
  }
  const newTexts = [];
  let counter = 0;
  for (let i = css.rules[0]; i <= css.rules[1]; i++) {
    const newText = texts[counter++].replace(regexp, "{\n   ");
    const newText2 = newText.replace(regexp2, ";\n   ");
    const newText3 = newText2.replace(regexp3, "}\n");
    newTexts.push(newText3);
  }
  const bigString = newTexts.join("");
  return bigString;
}
const style = document.styleSheets;

// 1º code explanations
const css0 = {
  cssFile: 0,
  rules: [0, 0], //inicio e fim das rules
};
const cssRulesFormated0 = filter_css_text(css0);
const explanation0 = document.querySelectorAll(".code")[0];
explanation0.innerHTML = cssRulesFormated0;

// Generic Button
const genericButton = document.querySelectorAll(".gn-button")[0];
const codeHtml0 = document.querySelectorAll(".code-html")[0];
codeHtml0.innerText = genericButton.outerHTML;

const css1 = {
  cssFile: 2,
  rules: [0, 2], //inicio e fim das rules
};
const cssRulesFormated1 = filter_css_text(css1);
const explanation1 = document.querySelectorAll(".code-css")[0];
explanation1.innerHTML = cssRulesFormated1;

// Link button
const linkButton = document.querySelector("a.gn-button");
const codeHtml2 = document.querySelectorAll(".code-html")[1];
console.log(linkButton);
codeHtml2.innerText = linkButton.outerHTML;

const css2 = {
  cssFile: 2,
  rules: [3, 3], //inicio e fim das rules
};
const cssRulesFormated2 = filter_css_text(css2);
console.log(cssRulesFormated2);
const explanation2 = document.querySelectorAll(".code-css")[1];
explanation2.innerHTML = cssRulesFormated2;

// copy-code button
const copyCodeBTN = document.createElement("button");
copyCodeBTN.setAttribute("class", "copy-code");
copyCodeBTN.innerText = "Copy";
const allCodeExamples = document.querySelectorAll(".code-example > div");
allCodeExamples.forEach((codeExample) => {
  const copyCodeClone = copyCodeBTN.cloneNode(true);
  copyCodeClone.onclick = (event) => {
    const button = event.currentTarget;
    const preTag = button.previousElementSibling;
    const innerCode = preTag.innerText;
    navigator.clipboard.writeText(innerCode);
    AlertCopy();
  };
  codeExample.appendChild(copyCodeClone);
});
function AlertCopy() {
  const alertCopied = document.querySelector(".alert-copied");
  alertCopied.setAttribute("show", "");
  setTimeout(() => {
    alertCopied.removeAttribute("show");
  }, 3000);
}

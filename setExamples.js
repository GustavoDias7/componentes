function setCodeExample({ path, componentSelector }) {
  const exampleContainer = document.querySelector(".example");
  const templateExample = `
  <div class="code-example">
    <h4>HTML</h4>
    <div>
      <pre class="code-html"></pre>
    </div>
    <h4>CSS</h4>
    <div>
      <pre class="code-css"></pre>
    </div>
  </div>
  `;
  exampleContainer.innerHTML += templateExample;
  setCSS(path);
  setHTML(componentSelector);
}
async function setCSS(path) {
  const cssFile = await fetch(path);
  const cssFileText = await cssFile.text();
  const codeCSS = document.querySelector(".code-css");
  codeCSS.textContent = cssFileText;
}
function setHTML(componentSelector) {
  const $componentSelector = document.querySelector(componentSelector);
  const codeHTML = document.querySelector(".code-html");
  codeHTML.textContent = $componentSelector.outerHTML;
}

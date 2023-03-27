function createElement(options) {}

createElement({
  template: `
    <div class="tool-container">
      <img
        src="https://popper.js.org/images/popcorn-box.svg"
        alt="Element"
        width="32"
        height="32"
        class="tool-element"
        tabindex="0"
      />
      <div class="tool-item">tooltip text</div>
    </div>
  `,
  data: [{ "tool-element": "tl0" }],
});

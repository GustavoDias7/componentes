const popcorn = document.querySelector("#popcorn");
const tooltip = document.querySelector("#tooltip");

const flip = { name: "flip", options: { padding: 8 } };
const offset = { name: "offset", options: { offset: [0, 8] } };

const popperInstance = Popper.createPopper(popcorn, tooltip, {
  placement: "top",
  modifiers: [flip, offset],
});

function show() {
  tooltip.setAttribute("data-show", "");
  popperInstance.update();
}

function hide() {
  tooltip.removeAttribute("data-show");
}

const showEvents = ["mouseenter", "focus"];
const hideEvents = ["mouseleave", "blur"];

showEvents.forEach((event) => {
  popcorn.addEventListener(event, show);
});

hideEvents.forEach((event) => {
  popcorn.addEventListener(event, hide);
});

const items = document.querySelectorAll(".list li");
const tooltips = document.querySelectorAll(".list p");

const popperInstance2 = Popper.createPopper(items, tooltips, {
  placement: "bottom",
  modifiers: [flip, offset],
});

function active(index) {
  tooltips[index].setAttribute("data-show", "");
  popperInstance2.update();
}

function disable(index) {
  tooltips[index].removeAttribute("data-show");
}

showEvents.forEach((event) => {
  items.forEach((item, index) => {
    item.addEventListener(event, () => active(index));
  });
});

hideEvents.forEach((event) => {
  items.forEach((item, index) => {
    item.addEventListener(event, () => disable(index));
  });
});

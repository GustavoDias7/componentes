const activeClass = "active";
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add(activeClass);
    } else {
      entry.target.classList.remove(activeClass);
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => {
  observer.observe(element);
});

function initScroll({ selector = "" }) {}

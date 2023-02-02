"use strict";
var hiddenElements = document.querySelectorAll(".hidden");
var activeClass = "active";
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
        }
        else {
            entry.target.classList.remove(activeClass);
        }
    });
});
hiddenElements.forEach(function (element) {
    observer.observe(element);
});

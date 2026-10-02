/* =====================================================
   About page JS — subtle scroll reveal for sections
   ===================================================== */

(function () {
  "use strict";

  var sections = document.querySelectorAll(
    ".about-intro, .timeline, .table-wrap, .aspirations, .skills-detailed, .hobbies-grid"
  );

  sections.forEach(function (el) {
    el.classList.add("reveal");
  });

  function onScroll() {
    sections.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        el.classList.add("reveal--visible");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("load", onScroll);
})();

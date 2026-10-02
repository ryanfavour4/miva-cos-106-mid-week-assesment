/* =====================================================
   Projects page JS — scroll reveal for project cards
   ===================================================== */

(function () {
  "use strict";

  var items = document.querySelectorAll(
    ".project-featured, .project-card, .status-summary"
  );

  items.forEach(function (el) {
    el.classList.add("reveal");
  });

  function onScroll() {
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) {
        el.classList.add("reveal--visible");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("load", onScroll);
})();

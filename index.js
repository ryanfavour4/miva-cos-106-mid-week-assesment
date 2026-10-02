/* =====================================================
   Homepage JS — reveal-on-scroll for sections
   ===================================================== */

(function () {
  "use strict";

  var reveals = document.querySelectorAll(
    ".snapshot-grid, .skills-grid, .home-projects, .interests-layout, .video-frame, .cta-inner"
  );

  reveals.forEach(function (el) {
    el.classList.add("reveal");
  });

  function onScroll() {
    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) {
        el.classList.add("reveal--visible");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("load", onScroll);
})();

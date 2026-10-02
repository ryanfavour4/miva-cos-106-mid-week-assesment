/* =====================================================
   global.js — shared site functionality
   Mobile navigation toggle + active link highlighting.
   ===================================================== */

(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });

    // Close menu when a link is clicked (mobile)
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("open");
        links.classList.remove("open");
      });
    });
  }

  /* ---- Highlight active nav link ---- */
  var currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav__links a").forEach(function (link) {
    var href = link.getAttribute("href") || "";
    var target = href.split("/").pop();

    if (target === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

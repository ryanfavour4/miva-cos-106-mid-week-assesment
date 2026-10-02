/* =====================================================
   Contact page — contact.js
   JavaScript form validation (no reliance on HTML5 validation).
   Validates: name, email, phone (digits only), message.
   ===================================================== */

(function () {
  "use strict";

  /* ---- DOM references ---- */
  var form = document.getElementById("contact-form");
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var phoneInput = document.getElementById("phone");
  var messageInput = document.getElementById("message");

  var nameError = document.getElementById("name-error");
  var emailError = document.getElementById("email-error");
  var phoneError = document.getElementById("phone-error");
  var messageError = document.getElementById("message-error");

  var successMsg = document.getElementById("success-msg");

  /* ---- Validation helper functions ---- */

  // Check if a field is empty
  function isEmpty(value) {
    return value.trim() === "";
  }

  // Check if email format is valid
  function isValidEmail(email) {
    /* Simple pattern: text@text.text */
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  // Check if phone contains only digits (and optional leading +)
  function isValidPhone(phone) {
    var cleaned = phone.trim();
    if (cleaned.charAt(0) === "+") {
      cleaned = cleaned.substring(1);
    }
    return /^\d+$/.test(cleaned) && cleaned.length >= 7;
  }

  /* ---- Show / clear error for a single field ---- */
  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.add("input-error");
  }

  function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.classList.remove("input-error");
  }

  /* ---- Validate all fields ---- */
  function validateForm() {
    var valid = true;

    /* Name: cannot be empty */
    if (isEmpty(nameInput.value)) {
      showError(nameInput, nameError, "Please enter your name.");
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    /* Email: cannot be empty, must be valid format */
    if (isEmpty(emailInput.value)) {
      showError(emailInput, emailError, "Please enter your email address.");
      valid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, emailError, "Please enter a valid email (e.g. you@example.com).");
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    /* Phone: cannot be empty, must be digits only */
    if (isEmpty(phoneInput.value)) {
      showError(phoneInput, phoneError, "Please enter your phone number.");
      valid = false;
    } else if (!isValidPhone(phoneInput.value)) {
      showError(phoneInput, phoneError, "Phone number must contain digits only (no spaces or dashes).");
      valid = false;
    } else {
      clearError(phoneInput, phoneError);
    }

    /* Message: cannot be empty */
    if (isEmpty(messageInput.value)) {
      showError(messageInput, messageError, "Please enter a message.");
      valid = false;
    } else {
      clearError(messageInput, messageError);
    }

    return valid;
  }

  /* ---- Form submit ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Hide any previous success message */
    successMsg.classList.add("hidden");

    if (validateForm()) {
      /* Form is valid &mdash; show success message */
      successMsg.classList.remove("hidden");

      /* Reset the form */
      form.reset();

      /* Scroll to success message */
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });

      /* Hide success message after 6 seconds */
      setTimeout(function () {
        successMsg.classList.add("hidden");
      }, 6000);
    }
  });

  /* ---- Clear errors as user types ---- */
  nameInput.addEventListener("input", function () {
    if (!isEmpty(nameInput.value)) clearError(nameInput, nameError);
  });

  emailInput.addEventListener("input", function () {
    if (!isEmpty(emailInput.value) && isValidEmail(emailInput.value)) {
      clearError(emailInput, emailError);
    }
  });

  phoneInput.addEventListener("input", function () {
    if (!isEmpty(phoneInput.value) && isValidPhone(phoneInput.value)) {
      clearError(phoneInput, phoneError);
    }
  });

  messageInput.addEventListener("input", function () {
    if (!isEmpty(messageInput.value)) clearError(messageInput, messageError);
  });
})();

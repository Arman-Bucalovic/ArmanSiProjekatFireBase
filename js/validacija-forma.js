document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("kontakt-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const ime = document.getElementById("ime");
    const email = document.getElementById("email");
    const poruka = document.getElementById("poruka");

    resetErrors();

    let isValid = true;

    if (!ime.value.trim() || ime.value.trim().length < 2) {
      setError(ime, "Unesite validno ime (minimalno 2 karaktera).");
      isValid = false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email, "Unesite validnu email adresu (npr. ime@domena.com).");
      isValid = false;
    }

    if (!poruka.value.trim() || poruka.value.trim().length < 10) {
      setError(poruka, "Poruka mora sadržavati minimalno 10 karaktera.");
      isValid = false;
    }

    if (isValid) {
      alert(`Hvala ${ime.value.trim()}! Vaša poruka je zaprimljena.`);
      form.reset();
    }
  });

  function setError(element, message) {
    const parent = element.parentElement;
    const error = parent.querySelector(".error-message");
    if (!error) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "error-message text-danger mt-1";
      errorMsg.textContent = message;
      parent.appendChild(errorMsg);
    }
    element.classList.add("is-invalid");
  }

  function resetErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("date");
  const footerYear = document.getElementById("year");

  if (dateInput) dateInput.setAttribute("min", today);
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetElement = document.getElementById(this.getAttribute("href").substring(1));
      if (targetElement) {
        const offset = window.innerWidth < 768 ? 60 : 100; // Adjust for mobile
        window.scrollTo({ top: targetElement.offsetTop - offset, behavior: "smooth" });
      }
      // Close menu on mobile after clicking a link
      document.getElementById("mobileMenu").classList.remove("open");
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // Handle Appointment Form Submission
  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const doctor = document.getElementById("doctor").value;
      const date = document.getElementById("date").value;
      const confirmationMessage = document.getElementById("confirmationMessage");

      if (!name || !doctor || !date) {
        showError("appointmentError", "Please fill in all fields.");
        return;
      }

      confirmationMessage.innerText = `✅ Thank you, ${name}! Your appointment with ${doctor} on ${date} has been booked.`;
      confirmationMessage.style.color = "green";

      setTimeout(() => (confirmationMessage.innerText = ""), 5000);
      this.reset();
    });
  }

  // Handle Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("message").value.trim();
      const submitButton = contactForm.querySelector("button[type='submit']");

      if (!name || !email || !message) {
        showError("contactError", "Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        showError("contactError", "Please enter a valid email address.");
        return;
      }

      submitButton.disabled = true; // Prevent multiple submissions
      let successMessage = document.getElementById("contactSuccessMessage");

      if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.id = "contactSuccessMessage";
        successMessage.style.color = "green";
        successMessage.style.textAlign = "center";
        contactForm.appendChild(successMessage);
      }

      successMessage.innerText = `✅ Thank you, ${name}! Your message has been sent.`;
      setTimeout(() => {
        successMessage.remove();
        submitButton.disabled = false; // Re-enable button
      }, 5000);

      this.reset();
    });
  }
});

// Function to display error messages near the input field
function showError(errorId, message) {
  let errorMessage = document.getElementById(errorId);
  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.id = errorId;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    errorMessage.style.marginTop = "5px";
    
    // Append error message below the form
    if (errorId === "appointmentError") {
      document.getElementById("appointmentForm").appendChild(errorMessage);
    } else {
      document.getElementById("contactForm").appendChild(errorMessage);
    }
  }
  errorMessage.innerText = message;
  setTimeout(() => errorMessage.remove(), 5000);
}

// Function to validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


//Responsive header
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  mobileMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

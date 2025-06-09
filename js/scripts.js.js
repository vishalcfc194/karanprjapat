// Activate payment option selection
document.querySelectorAll(".payment-option").forEach((option) => {
  option.addEventListener("click", function () {
    document.querySelectorAll(".payment-option").forEach((opt) => {
      opt.classList.remove("active");
    });
    this.classList.add("active");

    // Update QR code with selected amount
    const amount = this.querySelector("p").textContent.replace(/\D/g, "");
    document.querySelector(
      ".qr-code img"
    ).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://fatherscommunity.org/pay?amount=${amount}`;
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Language selector functionality
document.querySelectorAll("[data-lang]").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const lang = this.getAttribute("data-lang");
    changeLanguage(lang);
  });
});

// Set default language
let currentLanguage = "en";
changeLanguage(currentLanguage);

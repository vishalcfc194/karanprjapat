// Translation service using API (conceptual example)
class TranslationService {
  constructor() {
    this.apiKey = "YOUR_API_KEY"; // You'd get this from a translation service
    this.currentLanguage = "en";
    this.loadLanguage();
  }

  loadLanguage() {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      this.currentLanguage = savedLang;
      document.documentElement.lang = savedLang;
      if (savedLang === "ar" || savedLang === "he") {
        document.documentElement.dir = "rtl";
      }
    }
  }

  async translateText(text, targetLang) {
    // In a real implementation, this would call a translation API
    // For demo purposes, we'll just return the text with a prefix
    return `[${targetLang}] ${text}`;

    /* Real implementation would look like:
        const response = await fetch(`https://translation-api.com/translate?text=${encodeURIComponent(text)}&target=${targetLang}&key=${this.apiKey}`);
        const data = await response.json();
        return data.translatedText;
        */
  }

  async translatePage(targetLang) {
    this.currentLanguage = targetLang;
    document.documentElement.lang = targetLang;
    localStorage.setItem("preferredLanguage", targetLang);

    if (targetLang === "ar" || targetLang === "he") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }

    // Get all translatable elements
    const elements = document.querySelectorAll("[data-translate]");

    for (const element of elements) {
      const originalText =
        element.getAttribute("data-original") || element.textContent;
      element.setAttribute("data-original", originalText);

      // For production, you would call the actual API here
      const translatedText = await this.translateText(originalText, targetLang);
      element.textContent = translatedText;

      // For input placeholders
      if (element.tagName === "INPUT" && element.placeholder) {
        const originalPlaceholder =
          element.getAttribute("data-original-placeholder") ||
          element.placeholder;
        element.setAttribute("data-original-placeholder", originalPlaceholder);
        const translatedPlaceholder = await this.translateText(
          originalPlaceholder,
          targetLang
        );
        element.placeholder = translatedPlaceholder;
      }
    }
  }
}

// Initialize the translation service
const translator = new TranslationService();

// Set up language selector
document.querySelectorAll(".translate-language").forEach((item) => {
  item.addEventListener("click", async function (e) {
    e.preventDefault();
    const lang = this.getAttribute("data-lang");
    await translator.translatePage(lang);
  });
});

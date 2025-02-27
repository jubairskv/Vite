import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./Services/Translation/EnglishTranslation.json";
import translationAR from "./Services/Translation/ArabicTranslation.json";
import translationFR from "./Services/Translation/FrenchTranslation.json";
import translationHI from "./Services/Translation/HindiTranslation.json";

// Configure translations
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;

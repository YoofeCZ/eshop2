// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationCs from './locales/cs/translation.json';
import translationEn from './locales/en/translation.json';

const resources = {
  cs: { translation: translationCs },
  en: { translation: translationEn }
};

i18n
  .use(LanguageDetector)  // Přidáváme detekci jazyka
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'cs', // Výchozí jazyk, pokud detekce selže
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'], // Zdroje, ze kterých se jazyk detekuje
      caches: ['localStorage'], // Uloží jazyk do localStorage
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

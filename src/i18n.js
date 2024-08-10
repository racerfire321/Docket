import 'intl-pluralrules'; // Import the polyfill
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

// Define the translations
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
};

// Initialize i18n
i18n
  .use(initReactI18next) // Connects i18next with React
  .init({
    resources, // Load translations
    lng: Localization.getLocales()[0]?.languageTag || 'en', // Set the default language based on the device's locale
    fallbackLng: 'en', // Fallback to English if the detected language is not supported
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;

import 'intl-pluralrules'; 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';


const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
};


i18n
  .use(initReactI18next) 
  .init({
    resources, 
    lng: Localization.getLocales()[0]?.languageTag || 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Languages, resources } from './resources';

i18n.use(initReactI18next).init({
  fallbackLng: Languages.EN,
  interpolation: {
    escapeValue: false,
  },
  lng: Languages.EN,
  react: {
    useSuspense: false,
  },
  resources,
});

export default i18n;

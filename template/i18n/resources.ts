import en from './en_EN.json';

export const Languages = {
  EN: 'en',
} as const;

export const resources = {
  [Languages.EN]: {
    translation: en,
  },
};

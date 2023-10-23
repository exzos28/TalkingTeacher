import {Locale} from './Locale';
import {Language} from './Language';

export function convertLanguageToLocale(language: Language): Locale {
  const parts = language.split('-');
  if (parts.length >= 1) {
    const languageCode = parts[0];
    return languageCode as Locale;
  }
  throw new Error(`Can't convert ${language} to locale`);
}

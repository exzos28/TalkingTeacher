import {Locale} from './Locale';
import {Language} from './Language';

export function convertLocaleToLanguage(locale: Locale): Language {
  const languageCode = Object.values(Language).find(lang =>
    lang.includes(locale),
  );
  if (languageCode) {
    return languageCode;
  }
  throw new Error(`Can't convert ${locale} to language`);
}

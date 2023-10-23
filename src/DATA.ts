import {EnglishSvg, GermanSvg, RussiaSvg} from './assets/svg/colored';
import {Language} from './core';

export const LANGUAGES = new Map([
  [
    Language.English,
    {
      Icon: EnglishSvg,
      text: 'English',
      value: Language.English,
    },
  ],
  [
    Language.German,
    {
      Icon: GermanSvg,
      text: 'Deutsch',
      value: Language.German,
    },
  ],
  [
    Language.Russian,
    {
      Icon: RussiaSvg,
      text: 'Русский',
      value: Language.Russian,
    },
  ],
]);

import {
  EnglishSvg,
  FranceSvg,
  GermanSvg,
  ItalianSvg,
  PolandSvg,
  RussiaSvg,
  SpainSvg,
  UkraineSvg,
} from './assets/svg/colored';
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
    Language.French,
    {
      Icon: FranceSvg,
      text: 'Français',
      value: Language.French,
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
    Language.Italian,
    {
      Icon: ItalianSvg,
      text: 'Italiano',
      value: Language.Italian,
    },
  ],
  [
    Language.Polish,
    {
      Icon: PolandSvg,
      text: 'Polski',
      value: Language.Polish,
    },
  ],
  [
    Language.Ukrainian,
    {
      Icon: UkraineSvg,
      text: 'Українська',
      value: Language.Ukrainian,
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
  [
    Language.Spanish,
    {
      Icon: SpainSvg,
      text: 'Español',
      value: Language.Spanish,
    },
  ],
]);

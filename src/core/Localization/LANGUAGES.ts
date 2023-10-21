import {Locale} from './Locale';
import {DeFlagSvg, EnFlagSvg, RuFlagSvg} from '../../assets/svg';

export const LANGUAGES = new Map([
  [
    Locale.English,
    {
      Icon: EnFlagSvg,
      text: 'English',
      value: Locale.English,
    },
  ],
  [
    Locale.German,
    {
      Icon: DeFlagSvg,
      text: 'Deutsch',
      value: Locale.German,
    },
  ],
  [
    Locale.Russian,
    {
      Icon: RuFlagSvg,
      text: 'Русский',
      value: Locale.Russian,
    },
  ],
]);

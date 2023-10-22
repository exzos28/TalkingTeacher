import {Locale} from '../../core/Localization';

export type BottomTabParamList = {
  Dashboard: undefined;
  Settings:
    | {
        pickedLanguage: Locale;
      }
    | undefined;
  Debug: undefined;
};

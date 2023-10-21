import {Locale} from '../../core/Localization';

export type AuthParamList = {
  WelcomeStep1:
    | {
        pickedLanguage: Locale;
      }
    | undefined;
  PickLanguageForWelcomeStep1: undefined;
};

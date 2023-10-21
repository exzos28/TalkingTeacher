import {Locale} from '../../core/Localization';

export type AuthParamList = {
  WelcomeLanguages:
    | {
        pickedLanguage: Locale;
      }
    | undefined;
  WelcomeInfoApp: undefined;
  PickLanguageForWelcomeLanguages: undefined;
};

import {Language} from '../../core/Language';

export type AuthParamList = {
  WelcomeLanguages:
    | {
        pickedLanguage: Language;
      }
    | undefined;
  WelcomeInfoApp: undefined;
  PickLanguageForWelcomeLanguages: undefined;
};

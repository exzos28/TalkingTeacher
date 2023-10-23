import {Language} from '../../core/Language';

export type BottomTabParamList = {
  Dashboard: undefined;
  Settings:
    | {
        pickedLanguage: Language;
      }
    | undefined;
  Debug: undefined;
};

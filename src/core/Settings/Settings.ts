import {Bound} from '../fp';
import {ChatType} from '../../types';
import {Language} from '../Language';

export interface Settings {
  readonly studiedLanguage: Language;
  setStudiedLanguage: Bound<(language: Language) => Promise<void>, Settings>;
  readonly chatType: ChatType;
  setChatType: Bound<(type: ChatType) => Promise<void>, Settings>;
  readonly isAutomaticallyPlayed: boolean;
  setIsAutomaticallyPlayed: Bound<(next: boolean) => Promise<void>, Settings>;
}

export type SettingsRecord = {
  studiedLanguage?: Language;
  chatType?: ChatType;
  isAutomaticallyPlayed?: boolean;
};

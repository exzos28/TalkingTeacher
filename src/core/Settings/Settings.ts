import {Bound} from '../fp';
import {ChatType} from '../../types';

export interface Settings {
  readonly studiedLanguage: string;
  setStudiedLanguage: Bound<(language: string) => Promise<void>, Settings>;
  readonly chatType: ChatType;
  setChatType: Bound<(type: ChatType) => Promise<void>, Settings>;
  readonly isAutomaticallyPlayed: boolean;
  setIsAutomaticallyPlayed: Bound<(next: boolean) => Promise<void>, Settings>;
}

export type SettingsRecord = {
  studiedLanguage?: string;
  chatType?: ChatType;
  isAutomaticallyPlayed?: boolean;
};

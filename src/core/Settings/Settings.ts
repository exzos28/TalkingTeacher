import {Bound} from '../fp';

export interface Settings {
  readonly studiedLanguage: string;
  setStudiedLanguage: Bound<(language: string) => Promise<void>, Settings>;
}

export type SettingsRecord = {
  studiedLanguage?: string;
};

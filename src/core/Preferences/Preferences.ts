import {Bound} from '../fp';

export interface Preferences {
  readonly locale: string | undefined;
  setLocale: Bound<(locale: string) => Promise<void>, Preferences>;
}

export type PreferencesRecord = {
  locale?: string;
};

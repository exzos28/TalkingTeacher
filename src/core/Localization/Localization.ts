import {Localization as ExpoLocalization} from 'expo-localization';

export interface Localization {
  readonly state: ExpoLocalization | undefined;
}

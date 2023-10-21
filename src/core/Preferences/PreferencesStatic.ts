import {PreferencesRecord} from './Preferences';
import {define, PREFERENCES} from '../persistence';

export default abstract class PreferencesStatic {
  static defaultPreferences: PreferencesRecord = {};

  static async setPreferences(record: PreferencesRecord) {
    return _setPreferences(record);
  }

  static async getPreferences() {
    const preferences_ = await _getPreferences();
    return preferences_ !== null
      ? preferences_
      : PreferencesStatic.defaultPreferences;
  }
}
const [_getPreferences, _setPreferences] =
  define<PreferencesRecord>(PREFERENCES);

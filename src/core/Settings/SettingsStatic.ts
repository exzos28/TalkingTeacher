import {SettingsRecord} from './Settings';
import {define, SETTINGS} from '../persistence';

export default abstract class SettingsStatic {
  static defaultSettings: Required<SettingsRecord> = {
    studiedLanguage: 'en',
  };

  static async setSettings(record: SettingsRecord) {
    return _setSettings(record);
  }

  static async getSettings() {
    const preferences_ = await _getSettings();
    return preferences_ !== null
      ? preferences_
      : SettingsStatic.defaultSettings;
  }
}
const [_getSettings, _setSettings] = define<SettingsRecord>(SETTINGS);

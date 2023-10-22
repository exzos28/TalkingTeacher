import {flow, makeObservable, observable} from 'mobx';

import {Settings, SettingsRecord} from './Settings';
import SettingsStatic from './SettingsStatic';
import {bind} from '../fp';
import {Service} from '../structure';

export default class SettingsService implements Settings, Service {
  @observable.ref private _settings = SettingsStatic.defaultSettings;

  constructor() {
    makeObservable(this);
  }

  get studiedLanguage() {
    return this._settings.studiedLanguage;
  }

  setStudiedLanguage = bind(
    flow(function* (this: SettingsService, studiedLanguage: string) {
      const nextPreferences: Required<SettingsRecord> = {
        ...this._settings,
        studiedLanguage: studiedLanguage,
      };
      yield SettingsStatic.setSettings(nextPreferences);
      this._settings = nextPreferences;
    }),
    this,
  );

  private _load = flow(function* (this: SettingsService) {
    this._settings = yield SettingsStatic.getSettings();
  });

  subscribe() {
    this._load();
    return undefined;
  }
}

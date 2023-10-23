import {flow, makeObservable, observable} from 'mobx';

import {Settings, SettingsRecord} from './Settings';
import SettingsStatic from './SettingsStatic';
import {bind} from '../fp';
import {Service} from '../structure';
import {ChatType} from '../../types';
import {Language} from '../Language';

export default class SettingsService implements Settings, Service {
  @observable.ref private _settings = SettingsStatic.defaultSettings;

  constructor() {
    makeObservable(this);
  }

  get studiedLanguage() {
    return this._settings.studiedLanguage;
  }
  get chatType() {
    return this._settings.chatType;
  }
  get isAutomaticallyPlayed() {
    return this._settings.isAutomaticallyPlayed;
  }

  setChatType = bind(
    flow(function* (this: SettingsService, type: ChatType) {
      const nextPreferences: Required<SettingsRecord> = {
        ...this._settings,
        chatType: type,
      };
      yield SettingsStatic.setSettings(nextPreferences);
      this._settings = nextPreferences;
    }),
    this,
  );

  setIsAutomaticallyPlayed = bind(
    flow(function* (this: SettingsService, isAutomaticallyPlayed: boolean) {
      const nextPreferences: Required<SettingsRecord> = {
        ...this._settings,
        isAutomaticallyPlayed: isAutomaticallyPlayed,
      };
      yield SettingsStatic.setSettings(nextPreferences);
      this._settings = nextPreferences;
    }),
    this,
  );

  setStudiedLanguage = bind(
    flow(function* (this: SettingsService, studiedLanguage: Language) {
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

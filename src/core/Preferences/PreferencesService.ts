import {flow, makeObservable, observable} from 'mobx';

import {Preferences, PreferencesRecord} from './Preferences';
import PreferencesStatic from './PreferencesStatic';
import {bind} from '../fp';
import {Service} from '../structure';

export default class PreferencesService implements Preferences, Service {
  @observable.ref private _preferences = PreferencesStatic.defaultPreferences;

  constructor() {
    makeObservable(this);
  }

  get locale() {
    return this._preferences.locale;
  }

  setLocale = bind(
    flow(function* (this: PreferencesService, locale?: string) {
      const nextPreferences: PreferencesRecord = {
        ...this._preferences,
        locale,
      };
      yield PreferencesStatic.setPreferences(nextPreferences);
      this._preferences = nextPreferences;
    }),
    this,
  );

  private _load = flow(function* (this: PreferencesService) {
    this._preferences = yield PreferencesStatic.getPreferences();
  });

  subscribe() {
    this._load();
    return undefined;
  }
}

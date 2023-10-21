import {computed, makeObservable} from 'mobx';

import {Locale} from './Locale';
import BaseTranslationService from './BaseTranslationService';
import {Preferences} from '../Preferences';
import {Localization} from './Localization';
import {LocaleDict} from './LocaleStrings';
import {en, ru, de} from './dictionaries';

export default class TranslationService extends BaseTranslationService<
  Locale,
  LocaleDict
> {
  constructor(
    protected readonly _root: {
      readonly preferences: Preferences;
      readonly localization: Localization;
    },
  ) {
    super(_root);
    makeObservable(this);
  }

  protected get _defaultDict(): LocaleDict {
    return en;
  }

  @computed get locale(): Locale {
    return (this._root.preferences.locale as Locale) || Locale.English;
  }

  @computed get userLocaleStrings(): Partial<LocaleDict> {
    switch (this.locale) {
      case Locale.English:
        return en;
      case Locale.Russian:
        return ru;
      case Locale.German:
        return de;
      default:
        return {};
    }
  }
}

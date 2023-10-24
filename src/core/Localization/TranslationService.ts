import {computed, makeObservable} from 'mobx';

import BaseTranslationService from './BaseTranslationService';
import {Preferences} from '../Preferences';
import {Localization} from './Localization';
import {LocaleDict} from './LocaleStrings';
import {en, ru, de, uk, es, it, pl, fr} from './dictionaries';
import {Locale} from '../Language';

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
      case Locale.French:
        return fr;
      case Locale.Polish:
        return pl;
      case Locale.Italian:
        return it;
      case Locale.Spanish:
        return es;
      case Locale.Ukrainian:
        return uk;
      default:
        return {};
    }
  }
}

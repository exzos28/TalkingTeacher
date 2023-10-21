import {isEmpty} from 'lodash';
import {computed} from 'mobx';
import {ReadonlyDeep} from 'type-fest';

import {Localization} from './Localization';
import {BaseLocaleDict, TemplateExecutor, Translation} from './Translation';
import {Preferences} from '../Preferences';

export default abstract class BaseTranslationService<
  Locale extends string = string,
  LocaleDict extends BaseLocaleDict = BaseLocaleDict,
> implements Translation<Locale, LocaleDict>
{
  protected constructor(
    protected readonly _root: {
      readonly preferences: Preferences;
      readonly localization: Localization;
    },
  ) {}

  abstract get locale(): Locale;
  protected abstract get _defaultDict(): LocaleDict;

  @computed get strings(): ReadonlyDeep<LocaleDict> {
    const enStrings: LocaleDict = this._defaultDict;
    const localeEntries = Object.entries(enStrings).map(
      ([key, defaultString]) => {
        const localeKey = key as keyof LocaleDict;
        const string = this.userLocaleStrings[localeKey];
        return [localeKey, isEmpty(string) ? defaultString : string];
      },
    );
    return Object.fromEntries(localeEntries);
  }

  abstract get userLocaleStrings(): Partial<LocaleDict>;

  private _template(str: string) {
    return function (params: Record<string, string>) {
      const list = Object.entries(params);
      let newStr = str;
      for (const [key, value] of list) {
        newStr = newStr.replace(`{${key}}`, value);
      }
      return newStr;
    };
  }

  @computed({keepAlive: true})
  get templates() {
    return Object.fromEntries(
      Object.entries(this.strings).map(([key, string]) => [
        key,
        this._template(string),
      ]),
    ) as ReadonlyDeep<Record<keyof LocaleDict, TemplateExecutor>>;
  }
}

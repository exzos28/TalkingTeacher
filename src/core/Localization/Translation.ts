import {ReadonlyDeep} from 'type-fest';

export interface Translation<
  Locale extends string = string,
  LocaleDict extends BaseLocaleDict = BaseLocaleDict,
> {
  readonly locale: Locale;
  readonly strings: ReadonlyDeep<LocaleDict>;
  readonly templates: ReadonlyDeep<Record<keyof LocaleDict, TemplateExecutor>>;
}

export type TemplateExecutor = (
  params: Record<string, string | number>,
) => string;

export type BaseLocaleDict = Record<string, string>;

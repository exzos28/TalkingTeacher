import {
  ColorSchemeName,
  Appearance as RNAppearance,
  ScaledSize,
} from 'react-native';

import {action, computed, flow, makeObservable, observable} from 'mobx';
import {AsyncReturnType} from 'type-fest';

import {
  Appearance,
  PreferredThemeKind,
  SystemThemeKind,
  ThemeKind,
} from './Appearance';
import {bind} from '../fp';
import {define, THEME_KIND} from '../persistence';
import {Timer} from '../ReactUtil/Timer';
import {batchDisposers, Disposer, Service} from '../structure';
import {
  Dimensions,
  WindowDimensions,
  WindowDimensionsState,
} from '../WindowDimensions';

export default abstract class BaseAppearanceService<T>
  implements Appearance<T>, Service
{
  private static _themeModeTransitionMap = new Map([
    [ThemeKind.Auto, ThemeKind.Light],
    [ThemeKind.Light, ThemeKind.Dark],
    [ThemeKind.Dark, ThemeKind.Auto],
  ]);

  @observable
  private _systemThemeKind: SystemThemeKind = colorSchemeToThemeKind(
    RNAppearance.getColorScheme(),
  );
  @observable private _preferredThemeKind: PreferredThemeKind =
    ThemeKind.Unknown;

  get systemThemeKind() {
    return this._systemThemeKind;
  }

  get preferredThemeKind() {
    return this._preferredThemeKind;
  }

  @computed get actualThemeKind() {
    const themeKind =
      this._preferredThemeKind === ThemeKind.Auto
        ? this._systemThemeKind
        : this._preferredThemeKind;
    if (themeKind === ThemeKind.Unknown) {
      return ThemeKind.Light;
    }
    return themeKind;
  }

  @computed get isDark() {
    return this.actualThemeKind === ThemeKind.Dark;
  }

  @observable.ref private _theme = this.createTheme();

  protected constructor(
    private readonly _root: {
      readonly windowDimensionsState: WindowDimensionsState;
      readonly windowDimensions: WindowDimensions;
    },
  ) {
    makeObservable(this);
  }

  protected abstract createTheme(width?: ScaledSize, height?: ScaledSize): T;

  get theme() {
    return this._theme;
  }

  private _load = flow(function* (this: BaseAppearanceService<T>) {
    const _getThemeMode: AsyncReturnType<typeof getThemeMode> =
      yield getThemeMode();
    if (_getThemeMode === null) {
      this._preferredThemeKind = ThemeKind.Auto;
    } else {
      this._preferredThemeKind = _getThemeMode;
    }
    this._theme = this.createTheme();
  });

  @action
  toggleThemeKind = bind(
    flow(function* (this: BaseAppearanceService<T>) {
      const next = this.isDark ? ThemeKind.Light : ThemeKind.Dark;
      this.setThemeMode(next);
    }),
    this,
  );

  @action
  togglePreferredThemeKind = bind(
    flow(function* (this: BaseAppearanceService<T>) {
      const next =
        BaseAppearanceService._themeModeTransitionMap.get(
          this._preferredThemeKind,
        ) ?? ThemeKind.Auto;
      this.setThemeMode(next);
    }),
    this,
  );

  setThemeMode = bind(
    flow(function* (this: BaseAppearanceService<T>, next: ThemeKind) {
      yield putThemeMode(next);
      this._preferredThemeKind = next;
      this._theme = this.createTheme();
    }),
    this,
  );

  private _initialize() {
    const loading = this._load();
    return (() => loading.cancel()) as Disposer;
  }

  private _listenToColorSchemeChanges() {
    let timer: Timer;
    const callback: RNAppearance.AppearanceListener = ({colorScheme}) => {
      clearTimeout(timer);
      timer = setTimeout(
        action(() => {
          this._systemThemeKind = colorSchemeToThemeKind(colorScheme);
          this._theme = this.createTheme();
        }),
        500,
      );
    };
    const subscription = RNAppearance.addChangeListener(callback);
    return (() => subscription.remove()) as Disposer;
  }

  @action.bound private _onSizeChange(update: Dimensions) {
    this._theme = this.createTheme(update.window, update.screen);
  }

  private _listenToDimensionsChanges() {
    return this._root.windowDimensions.updates.listen(this._onSizeChange);
  }

  subscribe() {
    return batchDisposers(
      this._initialize(),
      this._listenToColorSchemeChanges(),
      this._listenToDimensionsChanges(),
    );
  }
}

const [getThemeMode, putThemeMode] = define<ThemeKind>(THEME_KIND);

const colorSchemeToThemeKind = (scheme: ColorSchemeName): SystemThemeKind => {
  switch (scheme) {
    case 'light':
      return ThemeKind.Light;
    case 'dark':
      return ThemeKind.Dark;
  }
  return ThemeKind.Unknown;
};

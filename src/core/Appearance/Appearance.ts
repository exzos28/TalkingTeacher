import {Bound} from '../fp';

export interface Appearance<T> {
  readonly systemThemeKind: SystemThemeKind;
  readonly preferredThemeKind: PreferredThemeKind;
  readonly isDark: boolean;
  togglePreferredThemeKind: Bound<() => Promise<void>, Appearance<T>>;
  toggleThemeKind: Bound<() => Promise<void>, Appearance<T>>;
  setThemeMode: Bound<(next: ThemeKind) => Promise<void>, Appearance<T>>;
  readonly actualThemeKind: ActualThemeKind;
  readonly theme: T;
}

export enum ThemeKind {
  Unknown,
  Light,
  Dark,
  Auto,
}

export type SystemThemeKind =
  | ThemeKind.Light
  | ThemeKind.Dark
  | ThemeKind.Unknown;
export type PreferredThemeKind = ThemeKind;
export type ActualThemeKind = ThemeKind.Light | ThemeKind.Dark;

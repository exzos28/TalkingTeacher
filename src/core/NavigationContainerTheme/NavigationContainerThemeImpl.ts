import {NavigationContainerTheme} from './NavigationContainerTheme';
import {Appearance} from '../Appearance';
import {computed, makeObservable} from 'mobx';
import {DefaultTheme} from '@react-navigation/native';
import {Theme} from '../styling';

export default class NavigationContainerThemeImpl
  implements NavigationContainerTheme
{
  constructor(
    private readonly _root: {readonly appearance: Appearance<Theme>},
  ) {
    makeObservable(this);
  }

  @computed({keepAlive: true})
  get theme() {
    const palette = this._root.appearance.theme.palette;
    return {
      ...DefaultTheme,
      dark: this._root.appearance.isDark,
      colors: {
        ...DefaultTheme.colors,
        primary: palette['color-primary-500'],
        background: palette['background-basic-color-4'],
        card: palette['background-basic-color-1'],
        border: palette['border-basic-color-5'],
        text: palette['text-basic-color'],
      },
    };
  }
}

import {ScaledSize} from 'react-native';

import BaseThemeImpl from './BaseThemeImpl';
import {Palette} from './Coloring';
import {Theme} from './Theme';

export default class ThemeImpl extends BaseThemeImpl implements Theme {
  constructor(
    public readonly palette: Palette,
    window: ScaledSize,
    screen: ScaledSize,
  ) {
    super(window, screen);
  }
}

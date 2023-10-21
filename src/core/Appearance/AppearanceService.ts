import {darkPalette, lightPalette, Theme, ThemeImpl} from '../styling';
import {
  WindowDimensions,
  WindowDimensionsState,
  WindowDimensionsStatic,
} from '../WindowDimensions';
import BaseAppearanceService from './BaseAppearanceService';

export default class AppearanceService extends BaseAppearanceService<Theme> {
  constructor(_root: {
    readonly windowDimensionsState: WindowDimensionsState;
    readonly windowDimensions: WindowDimensions;
  }) {
    super(_root);
  }

  createTheme(
    window = WindowDimensionsStatic.getInitialDimensions().window,
    screen = WindowDimensionsStatic.getInitialDimensions().screen,
  ) {
    return super.isDark
      ? new ThemeImpl(darkPalette, window, screen)
      : new ThemeImpl(lightPalette, window, screen);
  }
}

import {createContext} from 'react';

import lightPalette from './lightPalette';
import {Theme} from './Theme';
import ThemeImpl from './ThemeImpl';
import {WindowDimensionsStatic} from '../../WindowDimensions';

export default createContext<Theme>(
  new ThemeImpl(
    lightPalette,
    WindowDimensionsStatic.getInitialDimensions().window,
    WindowDimensionsStatic.getInitialDimensions().screen,
  ),
);

import React, {PropsWithChildren} from 'react';

import {observer} from 'mobx-react-lite';

import {Theme} from './Theme';
import ThemeContext from './ThemeContext';

type ThemeProviderProps = {
  theme: Theme;
};

export default observer(function ThemeProvider(
  props: PropsWithChildren<ThemeProviderProps>,
) {
  const {theme, ...rest} = props;
  return <ThemeContext.Provider value={theme} {...rest} />;
});

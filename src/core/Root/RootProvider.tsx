import React, {useEffect, useState} from 'react';

import {autorun} from 'mobx';
import {observer} from 'mobx-react-lite';

import {Root} from './Root';
import RootContext from './RootContext';
import RootServiceFactory from './RootServiceFactory';
import {CoreService} from '../Core';
import {Service} from '../structure';
import ThemeProvider from '../styling/Theme/ThemeProvider';

export type RootProviderProps = {
  children?: React.ReactNode;
};

export default observer((props: RootProviderProps) => {
  const {children} = props;
  const [core] = useState(() => new CoreService());
  useEffect(() => core.subscribe(), [core]);
  const [root, setRoot] = useState<Root & Service>();
  useEffect(
    () =>
      autorun(() => {
        if (core.initialized) {
          setRoot(_root => _root ?? new RootServiceFactory().create(core));
        }
      }),
    [core],
  );
  useEffect(() => root?.subscribe(), [root]);
  return root ? (
    <RootContext.Provider value={root}>
      <ThemeProvider theme={root.appearance.theme}>{children}</ThemeProvider>
    </RootContext.Provider>
  ) : null;
});

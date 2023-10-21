import {RefCallback} from 'react';

import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import {NavigationState} from '@react-navigation/routers';

export interface NavigationContainerBinding<
  ParamList extends ParamListBase = ParamListBase,
> {
  readonly props: NavigationContainerBindingProps<ParamList>;
}

export type NavigationContainerBindingProps<
  P extends ParamListBase = ParamListBase,
> = {
  onStateChange: (state: NavigationState | undefined) => void;
  onReady: () => void;
  ref: RefCallback<NavigationContainerRef<P>>;
};

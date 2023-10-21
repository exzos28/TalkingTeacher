import {
  NavigationContainerRef,
  NavigationState,
  ParamListBase,
} from '@react-navigation/native';

export interface NavigationContainer<L extends ParamListBase = ParamListBase> {
  readonly ref?: NavigationContainerRef<L>;
  readonly state?: NavigationState;
  readonly isReady: boolean;
  readonly isConfigured: boolean;
  readonly currentRouteName?: string;
}

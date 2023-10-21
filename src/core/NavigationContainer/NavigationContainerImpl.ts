import {
  NavigationContainerRef,
  NavigationState,
  ParamListBase,
} from '@react-navigation/native';
import {action, computed, makeObservable, observable} from 'mobx';

import {NavigationContainer} from './NavigationContainer';
import {NavigationContainerBinding} from './NavigationContainerBinding';

export default class NavigationContainerImpl<
  P extends ParamListBase = ParamListBase,
> implements NavigationContainer<P>, NavigationContainerBinding<P>
{
  @observable.ref private _ref?: NavigationContainerRef<P>;
  @observable.ref private _state?: NavigationState;
  @observable private _isReady = false;

  constructor() {
    makeObservable(this);
  }

  get ref() {
    return this._ref;
  }

  get isReady() {
    return this._isReady;
  }

  get state() {
    return this._state;
  }

  @computed
  get currentRouteName() {
    if (this.state) {
      return this.state.routeNames[this.state.index];
    }
    return undefined;
  }

  @computed
  get isConfigured() {
    return this._isReady && this._state !== undefined;
  }

  readonly props = {
    onStateChange: action((state?: NavigationState) => {
      this._state = state;
    }),
    onReady: action(() => {
      this._isReady = true;
    }),
    ref: action((ref: NavigationContainerRef<P> | null) => {
      this._ref = ref ?? undefined;
    }),
  };
}

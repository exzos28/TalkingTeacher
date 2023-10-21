import {LinkingOptions, ParamListBase} from '@react-navigation/native';
import {when} from 'mobx';

import {PREFIXES} from './constant';
import {LinkingOptionsProvider} from './LinkingOptionsProvider';
import {NavigationContainer} from '../NavigationContainer';
import {SpecialLocation, UNKNOWN} from '../SpecialLocation';
import {Url} from '../units';
import {RootParamList} from '../../navigation/RootNavigator';
import {LocationSource} from '../Location';

export default class MobileLinkingOptionsProviderImpl
  implements LinkingOptionsProvider
{
  constructor(
    private readonly _root: {
      readonly navigationContainer: NavigationContainer<RootParamList>;
      readonly locationSource: LocationSource;
      readonly specialLocation: SpecialLocation;
    },
  ) {}

  // TODO: Add others
  static readonly _CONFIG: LinkingOptions<RootParamList>['config'] = {
    screens: {},
  };

  private _filterSupported(address: Url): Url | null {
    if (this._root.specialLocation.parse(address).kind === UNKNOWN) {
      return address;
    }
    return null;
  }

  async getInitial() {
    const url = await this._root.locationSource.getInitial();
    if (url) {
      return this._filterSupported(url);
    }
  }

  listen(listener: (url: string) => void) {
    this._root.locationSource.updates.listen(async _address => {
      await when(() => this._root.navigationContainer.isReady);
      const address = this._filterSupported(_address);
      if (address !== null) {
        listener(address);
      }
    });
  }

  readonly linkingOptions: LinkingOptions<ParamListBase> = {
    prefixes: PREFIXES,
    config: MobileLinkingOptionsProviderImpl._CONFIG,
    getInitialURL: () => this.getInitial(),
    subscribe: listener => this.listen(listener),
  };
}

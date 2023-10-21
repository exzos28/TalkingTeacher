import {getActionFromState} from '@react-navigation/core';

import {Navigation} from './Navigation';
import {LinkingOptionsProvider} from '../LinkingOptionsProvider';
import {NavigationContainer} from '../NavigationContainer';

export default class NavigationImpl<P extends {}> implements Navigation {
  constructor(
    private readonly _root: {
      readonly navigationContainer: NavigationContainer<P>;
      readonly linkingOptionsProvider: LinkingOptionsProvider;
    },
  ) {}

  navigate(path: string): void {
    if (!path.startsWith('/')) {
      throw new Error(`The path must start with '/' (${path}).`);
    }

    const navigation = this._root.navigationContainer.ref;
    if (navigation === undefined) {
      throw new Error(
        "Couldn't find a navigation object. Seems like navigation container is not configured yet.",
      );
    }

    const options = this._root.linkingOptionsProvider.linkingOptions;

    if (!options.getStateFromPath) {
      throw new Error(
        'The links are not configured: getStateFromPath in undefined',
      );
    }

    const state = options.getStateFromPath(path, options.config);

    if (state) {
      const action = (options.getActionFromState ?? getActionFromState)(
        state,
        options?.config,
      );

      if (action !== undefined) {
        navigation.dispatch(action);
      } else {
        navigation.reset(state);
      }
    } else {
      throw new Error('Failed to parse the path to a navigation state.');
    }
  }
}

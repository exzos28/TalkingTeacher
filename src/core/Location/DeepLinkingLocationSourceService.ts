import {Linking} from 'react-native';

import {LocationSource} from './LocationSource';
import {BusImpl, Disposer, Service} from '../structure';
import {Url} from '../units';

export default class DeepLinkingLocationSourceService
  implements LocationSource, Service
{
  async getInitial(): Promise<Url | undefined> {
    const link = await Linking.getInitialURL();
    if (link) {
      return link as Url;
    }
    return undefined;
  }

  private readonly _updates = new BusImpl<(current: Url) => void>();

  get updates(): LocationSource['updates'] {
    return this._updates;
  }

  private readonly _onLinking = (event: {url: string}) => {
    this._updates.send(event.url as Url);
  };

  subscribe() {
    const _ = Linking.addEventListener('url', this._onLinking);
    return (() => _.remove()) as Disposer;
  }
}

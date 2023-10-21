import {Sharing} from './Sharing';

export default class StubSharingImpl implements Sharing {
  async shareFile() {
    throw new Error('Not implemented');
  }
}

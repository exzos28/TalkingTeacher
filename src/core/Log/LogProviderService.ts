import {autorun} from 'mobx';

import {Log} from './Log';
import {LogContent} from './LogContent';
import LogService from './LogService';
import {Service} from '../structure';
import {Debug} from '../Configuration';

const LOG_TO_METRO = false;

export default class LogProviderService implements Service, Log {
  private readonly _log = new LogService();

  constructor(private readonly _root: {readonly debug: Debug}) {}

  get records() {
    return this._log.records;
  }

  write(content: LogContent) {
    const {logEnabled} = this._root.debug;
    if (logEnabled) {
      if (LOG_TO_METRO) {
      }
      this._log.write(content);
    }
  }

  reset() {
    return this._log.reset();
  }

  subscribe() {
    return autorun(() => {
      const {logEnabled} = this._root.debug;
      if (!logEnabled) {
        this._log.reset();
      }
    });
  }
}

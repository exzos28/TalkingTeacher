import {action, observable} from 'mobx';

import {Log, LogRecord} from './Log';
import {LogContent} from './LogContent';
import {Millisecond} from '../Time';

export default class LogService implements Log {
  private readonly _records = observable.array<LogRecord>();
  private _id = 0;

  get records() {
    return this._records;
  }

  write = action((content: LogContent) => {
    this._records.push({
      id: this._id++,
      capturedAt: new Date().getTime() as Millisecond,
      content,
    });
  });

  reset = action(() => {
    this._id = 0;
    this._records.clear();
  });
}

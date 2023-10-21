import {LogContent} from './LogContent';
import {Millisecond} from '../Time';

export interface Log {
  readonly records: readonly Readonly<LogRecord>[];
  write(content: LogContent): void;
  reset(): void;
}

export interface LogRecord {
  id: number;
  capturedAt: Millisecond;
  content: LogContent;
}

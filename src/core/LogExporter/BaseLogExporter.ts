import dayjs from 'dayjs';

import {FileOptions, LogExporter, Markdown} from './LogExporter';
import {Log} from '../Log';

export default abstract class BaseLogExporter implements LogExporter {
  abstract save(): Promise<void>;
  abstract share(): Promise<void>;

  getContent(history: Log) {
    const body = history.records
      .map(_ => `${new Date(_.capturedAt).toISOString()}\n${_.content.body}`)
      .join('\n\n');
    return `${CODE}\n${body}\n${CODE}` as Markdown;
  }

  getFileOptions(history: Log): FileOptions {
    return {
      fileName: `${dayjs().format('HH.mm.ss__DD.MM')}_Logs.txt`,
      content: this.getContent(history),
    };
  }
}

const CODE = '```';

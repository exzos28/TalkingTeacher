import {Opaque} from 'type-fest';

import {Log} from '../Log';

export type Markdown = Opaque<string, 'Markdown'>;

export interface FileOptions {
  fileName: string;
  content: string;
}

export interface LogExporter {
  getContent: (history: Log) => Markdown;
  getFileOptions: (history: Log) => FileOptions;
  save: () => Promise<void>;
  share: () => Promise<void>;
}

import BaseLogExporter from './BaseLogExporter';
import {LogExporter} from './LogExporter';
import {Log} from '../Log';

export default class WebLogExporterImpl
  extends BaseLogExporter
  implements LogExporter
{
  constructor(
    private readonly _root: {
      readonly log: Log;
    },
  ) {
    super();
  }

  private static _saveFile(fileName: string, content: string) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(content)], {type: 'application/json'}),
    );
    a.click();
  }

  async save(): Promise<void> {
    const options = this.getFileOptions(this._root.log);
    WebLogExporterImpl._saveFile(options.fileName, 'options.content');
  }

  async share(): Promise<void> {
    throw new Error('Not implemented');
  }
}

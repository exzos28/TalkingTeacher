import BaseLogExporter from './BaseLogExporter';
import {LogExporter} from './LogExporter';
import {Log} from '../Log';
// noinspection ES6PreferShortImport
import {DownloadDirectoryPath, writeFile} from '../ReactNativeFs';
import {Sharing} from '../Sharing';

export default class AndroidLogExporterImpl
  extends BaseLogExporter
  implements LogExporter
{
  constructor(
    private readonly _root: {
      readonly sharing: Sharing;
      readonly log: Log;
    },
  ) {
    super();
  }

  async save(): Promise<void> {
    const {fileName, content} = this.getFileOptions(this._root.log);
    const filepath = DownloadDirectoryPath + '/' + fileName;
    try {
      await writeFile(filepath, content, 'utf8');
    } catch (err) {
      throw new Error('Log export error');
    }
  }

  async share(): Promise<void> {
    const options = this.getFileOptions(this._root.log);
    return this._root.sharing.shareFile(options.fileName, options.content);
  }
}

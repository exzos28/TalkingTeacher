import BaseLogExporter from './BaseLogExporter';
import {LogExporter} from './LogExporter';
import {Log} from '../Log';
import {Sharing} from '../Sharing';

export default class IosLogExporterImpl
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
    return this.share();
  }

  async share(): Promise<void> {
    const options = this.getFileOptions(this._root.log);
    return this._root.sharing.shareFile(options.fileName, options.content);
  }
}

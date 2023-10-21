import BaseLogExporter from './BaseLogExporter';
import {LogExporter} from './LogExporter';
import {Log} from '../Log';
import {Sharing} from '../Sharing';

export default class StubLogExporterImpl
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
    throw new Error('Not implemented');
  }

  async share(): Promise<void> {
    throw new Error('Not implemented');
  }
}

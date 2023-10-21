import {Platform} from 'react-native';

import AndroidLogExporterImpl from './AndroidLogExporterImpl';
import IosLogExporterImpl from './IosLogExporterImpl';
import {LogExporter} from './LogExporter';
import StubLogExporterImpl from './StubLogExporterImpl';
import {Log} from '../Log';
import {Sharing} from '../Sharing';

export default class MobileLogExporterFactory {
  constructor(
    private readonly _root: {
      readonly sharing: Sharing;
      readonly log: Log;
    },
  ) {}

  create(): LogExporter {
    switch (Platform.OS) {
      case 'android':
        return new AndroidLogExporterImpl(this._root);
      case 'ios':
        return new IosLogExporterImpl(this._root);
      default:
        return new StubLogExporterImpl(this._root);
    }
  }
}

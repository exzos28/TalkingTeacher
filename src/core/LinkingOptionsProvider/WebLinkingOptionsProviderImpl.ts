import {LinkingOptions, ParamListBase} from '@react-navigation/native';

import {PREFIXES} from './constant';
import MobileLinkingOptionsProviderImpl from './MobileLinkingOptionsProviderImpl';
import {LinkingOptionsProvider} from './LinkingOptionsProvider';

export default class WebLinkingOptionsProviderImpl
  implements LinkingOptionsProvider
{
  readonly linkingOptions: LinkingOptions<ParamListBase> = {
    prefixes: PREFIXES,
    config: MobileLinkingOptionsProviderImpl._CONFIG,
  };
}

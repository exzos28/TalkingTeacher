import BaseRootService from './BaseRootService';
import {Root} from './Root';
import {
  JsonKeyValueMap,
  JsonKeyValueStore,
  JsonKeyValueStoreService,
  JsonSecureKeyValueMap,
} from '../JsonKeyValueStore';
import {
  KeyValueMap,
  KeyValueStore,
  SecureKeyValueMap,
  WebKeyValueStoreService,
} from '../KeyValueStore';
import {WebLinkingOptionsProviderImpl} from '../LinkingOptionsProvider';
import WebLocationImpl from '../Location/WebLocationImpl';
import {batchDisposers, Service} from '../structure';
import {StubSharingImpl} from '../Sharing';
import {WebLogExporterImpl} from '../LogExporter';
import DeepLinkingLocationSourceService from '../Location/DeepLinkingLocationSourceService';

export default class WebRootService
  extends BaseRootService
  implements Root, Service
{
  readonly logExporter = new WebLogExporterImpl(this);
  readonly sharing = new StubSharingImpl();
  readonly keyValueStore = new WebKeyValueStoreService<KeyValueMap>();
  readonly secureKeyValueStore = this
    .keyValueStore as unknown as KeyValueStore<SecureKeyValueMap>;
  readonly jsonKeyValueStore = new JsonKeyValueStoreService(
    this,
    this.keyValueStore as KeyValueStore<JsonKeyValueMap>,
  );
  readonly jsonSecureKeyValueStore = this
    .jsonKeyValueStore as unknown as JsonKeyValueStore<JsonSecureKeyValueMap>;

  readonly linkingOptionsProvider = new WebLinkingOptionsProviderImpl();
  readonly location = new WebLocationImpl(this);
  readonly locationSource = new DeepLinkingLocationSourceService();

  subscribe() {
    return batchDisposers(
      super.subscribe(),
      this.keyValueStore.subscribe(),
      this.jsonKeyValueStore.subscribe(),
    );
  }
}

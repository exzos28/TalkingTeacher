import BaseRootService from './BaseRootService';
import {Root} from './Root';
import {batchDisposers, Service} from '../structure';
import {MobileLogExporterFactory} from '../LogExporter';
import {
  KeyValueMap,
  KeyValueStore,
  MobileKeyValueStoreImpl,
  SecureKeyValueMap,
  SecureKeyValueStoreFactory,
} from '../KeyValueStore';
import {JsonKeyValueMap, JsonKeyValueStoreService} from '../JsonKeyValueStore';
import {MobileLocationService} from '../Location';
import {MobileLinkingOptionsProviderImpl} from '../LinkingOptionsProvider';
import {MobileSharingImpl} from '../Sharing';

export default class MobileRootService
  extends BaseRootService
  implements Root, Service
{
  readonly keyValueStore = new MobileKeyValueStoreImpl<KeyValueMap>();
  readonly jsonKeyValueStore = new JsonKeyValueStoreService(
    this,
    this.keyValueStore as KeyValueStore<JsonKeyValueMap>,
  );
  private readonly _secureKeyValueStoreFactory =
    new SecureKeyValueStoreFactory<SecureKeyValueMap>();
  readonly secureKeyValueStore = this._secureKeyValueStoreFactory.create();
  readonly jsonSecureKeyValueStore = new JsonKeyValueStoreService(
    this,
    this.secureKeyValueStore,
  );

  readonly sharing = new MobileSharingImpl();
  readonly logExporter = new MobileLogExporterFactory(this).create();

  readonly location = new MobileLocationService(this);
  readonly locationSource = this.location;
  readonly linkingOptionsProvider = new MobileLinkingOptionsProviderImpl(this);

  subscribe() {
    return batchDisposers(
      super.subscribe(),
      this.jsonKeyValueStore.subscribe(),
      this.jsonSecureKeyValueStore.subscribe(),
      this.location.subscribe(),
    );
  }
}

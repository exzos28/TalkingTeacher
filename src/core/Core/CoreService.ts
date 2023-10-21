import {computed, makeObservable} from 'mobx';

import {Core} from './Core';
import {ConfigurationService} from '../Configuration';
import {batchDisposers, Service} from '../structure';
import {AppLifecycleService} from '../AppLifecycle';

export default class CoreService implements Core, Service {
  readonly appLifecycle = new AppLifecycleService();
  readonly configuration = new ConfigurationService(this);

  constructor() {
    makeObservable(this);
  }

  get debug() {
    return this.configuration;
  }

  @computed get initialized() {
    return this.appLifecycle.initialized && this.configuration.initialized;
  }

  subscribe() {
    return batchDisposers(
      this.appLifecycle.subscribe(),
      this.configuration.subscribe(),
    );
  }
}

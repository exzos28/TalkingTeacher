import {computed, flow, makeObservable, observable, runInAction} from 'mobx';
import {AsyncReturnType} from 'type-fest';

import {
  Configuration,
  ConfigurationValues,
  CustomEnvironment,
  DefaultEnvironment,
  EnvironmentId,
} from './Configuration';
import {Debug} from './Debug';
import {AppLifecycle} from '../AppLifecycle';
import {bind} from '../fp';
import {Op} from '../Math';
import {CONFIGURATION, define} from '../persistence';
import {Service} from '../structure';

export default abstract class BaseConfigurationService<
  C extends ConfigurationValues = ConfigurationValues,
> implements Configuration<C>, Service, Debug
{
  abstract readonly defaultEnvironment: DefaultEnvironment<C>;

  @observable private _initialized = false;
  @observable.ref private _record: ConfigurationRecord<C> = {
    debugEnabled: false,
    logEnabled: false,
    environments: [],
    nextEnvironmentId: 0 as EnvironmentId,
  };

  protected constructor(
    private readonly _core: {readonly appLifecycle: AppLifecycle},
  ) {
    makeObservable(this);
  }

  get initialized() {
    return this._initialized;
  }

  private get _environmentId() {
    return this._record.environmentId;
  }

  @computed
  get current() {
    const current = this.customEnvironments.find(
      _ => _.id === this._environmentId,
    );
    return current ?? this.defaultEnvironment;
  }

  get values() {
    return this.current.values;
  }

  get customEnvironments() {
    return this._record.environments.map(recordToEnvironment);
  }

  get debugEnabled() {
    return this._record.debugEnabled || __DEV__;
  }

  get logEnabled() {
    return (
      this._core.appLifecycle.hasJustBeenInstalled || this._record.logEnabled
    );
  }

  private async _setDebug(enabled: boolean) {
    if (this._record.debugEnabled === enabled) {
      return;
    }
    const record: ConfigurationRecord<C> = {
      ...this._record,
      debugEnabled: enabled,
    };
    await setConfiguration(record);
    runInAction(() => {
      this._record = record;
    });
  }

  readonly enableDebug = bind(() => this._setDebug(true), this);
  readonly disableDebug = bind(() => this._setDebug(false), this);

  readonly toggleLog = bind(async () => {
    const logEnabled = !this._record.logEnabled;
    const record: ConfigurationRecord<C> = {
      ...this._record,
      logEnabled,
    };
    await setConfiguration(record);
    runInAction(() => {
      this._record = record;
    });
  }, this);

  setEnvironment = flow(function* (
    this: BaseConfigurationService,
    id?: EnvironmentId,
  ) {
    const record: ConfigurationRecord = {
      ...this._record,
      environmentId: id,
    };
    yield setConfiguration(record);
    this._record = record;
  }).bind(this);

  nextEnvironment = bind(
    flow(function* (this: BaseConfigurationService) {
      const id = this._environmentId;
      const environments = this.customEnvironments;
      if (id === undefined) {
        const [first] = environments;
        if (first) {
          yield this.setEnvironment(first.id);
        }
        return;
      }
      const index = environments.findIndex(_ => _.id === id);
      const nextIndex = index + 1;
      if (nextIndex === environments.length) {
        yield this.setEnvironment();
        return;
      }
      const nextEnvironment = environments[nextIndex];
      yield this.setEnvironment(nextEnvironment.id);
    }),
    this,
  );

  createEnvironment = flow(function* (
    this: BaseConfigurationService<C>,
    patch: Partial<C>,
  ) {
    const newValues = {...this.defaultEnvironment.values, ...patch};
    const id = this._record.nextEnvironmentId;
    const nextId = Op.add(id, 1 as EnvironmentId);
    const environmentRecord: EnvironmentRecord<C> = {values: newValues, id};
    const environment = recordToEnvironment(environmentRecord);
    const records = [
      ...this.customEnvironments.map(_ => environmentToRecord(_)),
      environmentRecord,
    ];
    this._record = {
      ...this._record,
      environments: records,
      nextEnvironmentId: nextId,
    };
    return environment;
  });

  deleteEnvironment = flow(function* (
    this: BaseConfigurationService,
    id: EnvironmentId,
  ) {
    const environments = this.customEnvironments.filter(_ => _.id !== id);
    const records = environments.map(environmentToRecord);
    const nextId = this._record.nextEnvironmentId;
    const selectedId =
      this._environmentId === id ? undefined : this._environmentId;
    const record: ConfigurationRecord = {
      ...this._record,
      environments: records,
      environmentId: selectedId,
      nextEnvironmentId: nextId,
    };
    yield setConfiguration(record);
    this._record = record;
  });

  private _load = flow(function* (this: BaseConfigurationService) {
    const configuration: AsyncReturnType<typeof getConfiguration> =
      yield getConfiguration();
    if (configuration !== null) {
      this._record = configuration;
    }
    this._initialized = true;
  });

  hasMultipleEnvironments(): boolean {
    return this._record.environments.length > 0;
  }

  subscribe() {
    this._load();
  }
}

const [getConfiguration, setConfiguration] =
  define<ConfigurationRecord>(CONFIGURATION);

interface ConfigurationRecord<C = ConfigurationValues> {
  debugEnabled: boolean;
  logEnabled: boolean;
  environments: EnvironmentRecord<C>[];
  environmentId?: EnvironmentId;
  nextEnvironmentId: EnvironmentId;
}

interface EnvironmentRecord<C = ConfigurationValues> {
  id: EnvironmentId;
  values: C;
}

const environmentToRecord = <C = ConfigurationValues>(
  _: CustomEnvironment<C>,
): EnvironmentRecord<C> => ({
  values: _.values,
  id: _.id,
});

const recordToEnvironment = <C = ConfigurationValues>(
  _: EnvironmentRecord<C>,
): CustomEnvironment<C> => ({
  values: _.values,
  isDefault: false,
  id: _.id,
});

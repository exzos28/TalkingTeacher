import {Opaque, Primitive} from 'type-fest';

import {Bound} from '../fp';

export interface Configuration<
  C extends ConfigurationValues = ConfigurationValues,
> {
  readonly current: Environment<C>;
  readonly values: C;
  readonly defaultEnvironment: DefaultEnvironment<C>;
  readonly customEnvironments: CustomEnvironment<C>[];
  setEnvironment(id?: EnvironmentId): Promise<void>;
  readonly nextEnvironment: Bound<() => Promise<void>, Configuration>;
  createEnvironment(patch: Partial<C>): Promise<CustomEnvironment<C>>;
  deleteEnvironment(id: EnvironmentId): Promise<void>;

  hasMultipleEnvironments(): boolean;
}

export type Environment<C = ConfigurationValues> =
  | DefaultEnvironment<C>
  | CustomEnvironment<C>;

export type ConfigurationValues = Record<string, Primitive>;

export type DefaultEnvironment<C = ConfigurationValues> = {
  values: C;
  isDefault: true;
};

export type CustomEnvironment<C = ConfigurationValues> = {
  values: C;
  isDefault: false;
  id: EnvironmentId;
};

export type EnvironmentId = Opaque<number, 'EnvironmentId'>;

import {Configuration, Debug} from '../Configuration';
import {AppLifecycle} from '../AppLifecycle';
import {ConfigurationValues} from '../Configuration/ConfigurationValues';

export interface Core {
  readonly initialized: boolean;
  readonly appLifecycle: AppLifecycle;
  readonly configuration: Configuration<ConfigurationValues>;
  readonly debug: Debug;
}

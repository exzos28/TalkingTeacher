import {ConfigurationValues} from './ConfigurationValues';
import values from './values';
import {AppLifecycle} from '../AppLifecycle';
import BaseConfigurationService from './BaseConfigurationService';

export default class ConfigurationService extends BaseConfigurationService<ConfigurationValues> {
  defaultEnvironment = {
    isDefault: true,
    values,
  } as const;

  constructor(_core: {readonly appLifecycle: AppLifecycle}) {
    super(_core);
  }
}

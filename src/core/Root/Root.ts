import {Appearance} from '../Appearance';
import {Theme} from '../styling';
import {
  NavigationContainer,
  NavigationContainerBinding,
} from '../NavigationContainer';
import {RootParamList} from '../../Navigation/RootNavigator';
import {NavigationContainerTheme} from '../NavigationContainerTheme';
import {SpecialLocation} from '../SpecialLocation';
import {Configuration, Debug} from '../Configuration';
import {Locale, Localization, Translation} from '../Localization';
import {Preferences} from '../Preferences';
import {LocaleDict} from '../Localization/LocaleStrings';
import {WindowDimensionsState} from '../WindowDimensions';
import {LinkingOptionsProvider} from '../LinkingOptionsProvider';
import {Log} from '../Log';
import {Location} from '../Location';
import {Sharing} from '../Sharing';
import {LogExporter} from '../LogExporter';
import {ConfigurationValues} from '../Configuration/ConfigurationValues';

export interface Root {
  readonly appearance: Appearance<Theme>;
  readonly sharing: Sharing;
  readonly navigationContainer: NavigationContainer<RootParamList>;
  readonly navigationContainerTheme: NavigationContainerTheme;
  readonly navigationContainerBinding: NavigationContainerBinding;
  readonly specialLocation: SpecialLocation;

  readonly configuration: Configuration<ConfigurationValues>;
  readonly debug: Debug;
  readonly localization: Localization;
  readonly log: Log;
  readonly logExporter: LogExporter;
  readonly preferences: Preferences;
  readonly translation: Translation<Locale, LocaleDict>;
  readonly windowDimensionsState: WindowDimensionsState;
  readonly location: Location;
  readonly linkingOptionsProvider: LinkingOptionsProvider;

  reset(): void;
}

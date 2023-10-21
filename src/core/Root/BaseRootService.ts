import {Core} from '../Core';
import {Root} from './Root';
import {batchDisposers, Service} from '../structure';
import LocalizationService from '../Localization/LocalizationService';
import {PreferencesService} from '../Preferences';
import {JsonImpl} from '../Json';
import {TranslationService} from '../Localization';
import {
  WindowDimensionsService,
  WindowDimensionsStateService,
} from '../WindowDimensions';
import {AppearanceService} from '../Appearance';
import {LogExporter} from '../LogExporter';
import {AppWindowService, AppWindowStateService} from '../AppWindow';
import {
  JsonKeyValueMap,
  JsonKeyValueStore,
  JsonSecureKeyValueMap,
} from '../JsonKeyValueStore';
import {LogProviderService} from '../Log';
import {TimeImpl} from '../Time';
import {LocationSource, Location} from '../Location';
import {LinkingOptionsProvider} from '../LinkingOptionsProvider';
import {SpecialLocationImpl} from '../SpecialLocation';
import {NavigationContainerImpl} from '../NavigationContainer';
import {RootParamList} from '../../Navigation/RootNavigator';
import {NavigationContainerThemeImpl} from '../NavigationContainerTheme';
import {NavigationImpl} from '../Navigation';
import {DebugLocationDetectorService} from '../DebugLocationDetector';
import {Sharing} from '../Sharing';
import {ManualTestHelperImpl} from '../ManualTestHelper';

export default abstract class BaseRootService implements Root, Service {
  constructor(protected readonly _core: Core) {}

  readonly localization = new LocalizationService(this);

  readonly preferences = new PreferencesService();
  readonly json = new JsonImpl();
  readonly translation = new TranslationService(this);

  readonly windowDimensions = new WindowDimensionsService();
  readonly windowDimensionsState = new WindowDimensionsStateService(this);

  readonly appearance = new AppearanceService(this);
  abstract readonly logExporter: LogExporter;
  abstract readonly sharing: Sharing;

  readonly appWindow = new AppWindowService();
  readonly appWindowState = new AppWindowStateService(this);

  abstract readonly jsonKeyValueStore: JsonKeyValueStore<JsonKeyValueMap>;
  abstract readonly jsonSecureKeyValueStore: JsonKeyValueStore<JsonSecureKeyValueMap>;

  get configuration() {
    return this._core.configuration;
  }
  get debug() {
    return this._core.debug;
  }
  get appLifecycle() {
    return this._core.appLifecycle;
  }
  readonly log = new LogProviderService(this);

  readonly time = new TimeImpl();

  // NAVIGATION
  abstract readonly location: Location;
  abstract readonly locationSource: LocationSource;
  abstract readonly linkingOptionsProvider: LinkingOptionsProvider;

  readonly debugLocationDetector = new DebugLocationDetectorService(this);
  readonly specialLocation = new SpecialLocationImpl();
  readonly navigationContainer = new NavigationContainerImpl<RootParamList>();
  readonly navigationContainerBinding = this.navigationContainer;
  readonly navigationContainerTheme = new NavigationContainerThemeImpl(this);
  readonly navigation = new NavigationImpl<RootParamList>(this);
  //

  readonly manualTestHelper = new ManualTestHelperImpl();

  subscribe() {
    return batchDisposers(
      this.localization.subscribe(),
      this.preferences.subscribe(),
      this.windowDimensions.subscribe(),
      this.windowDimensionsState.subscribe(),
      this.appearance.subscribe(),
      this.appWindow.subscribe(),
      this.appWindowState.subscribe(),
      this.log.subscribe(),
      this.debugLocationDetector.subscribe(),
    );
  }

  reset() {}
}
import {Url} from '../units';

export interface Location {
  readonly base: Url;
  open(locator: Url): Promise<void>;
  canOpen(locator: Url): Promise<boolean>;
}

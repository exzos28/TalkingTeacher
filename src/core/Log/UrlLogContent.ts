import {compact} from 'lodash';

import {LogContent} from './LogContent';
import {Url} from '../units';

export default class UrlLogContent implements LogContent {
  constructor(
    public readonly locator: Url,
    public readonly description?: string,
  ) {}

  get body() {
    return compact([this.description, this.locator]).join('\n');
  }
}

import {makeObservable, observable, runInAction, when} from 'mobx';

import {PromiseCancellationError} from '../Error';
import {
  FULFILLED,
  PENDING,
  PromiseResult,
  PromiseState,
  REJECTED,
} from './PromiseState';
import {PromiseStateProvider} from './PromiseStateProvider';

export default class PromiseStateProviderImpl<R, E>
  implements PromiseStateProvider<R, E>
{
  private static readonly PENDING_STATE = {status: PENDING} as const;

  private static readonly CANCELLED_STATE = {
    status: REJECTED,
    error: new PromiseCancellationError(),
  } as const;

  @observable.ref private _state?: PromiseState<
    R,
    E | PromiseCancellationError
  >;

  constructor(private readonly _fetch: () => Promise<R>) {
    makeObservable(this);
  }

  get state() {
    return this._state;
  }

  private _setState(state: PromiseStateProvider<R, E>['state']) {
    runInAction(() => {
      this._state = state;
    });
  }

  async fetch(): Promise<PromiseResult<R, E | PromiseCancellationError>> {
    this._setState(PromiseStateProviderImpl.PENDING_STATE);

    const fetch_ = this._fetch()
      .then(res => ({status: FULFILLED, result: res} as const))
      .catch(error => ({status: REJECTED, error: error as E} as const));

    const response = await Promise.race([
      fetch_,
      when(() => this._state === PromiseStateProviderImpl.CANCELLED_STATE),
    ]);

    if (response === undefined) {
      return PromiseStateProviderImpl.CANCELLED_STATE;
    }
    this._setState(response);

    return fetch_;
  }

  cancel() {
    this._setState(PromiseStateProviderImpl.CANCELLED_STATE);
  }
}

import {PromiseCancellationError} from '../Error';
import {PromiseResult, PromiseState} from './PromiseState';

export interface PromiseStateProvider<R, E> {
  readonly state: PromiseState<R, E | PromiseCancellationError> | undefined;
  fetch(): Promise<PromiseResult<R, E | PromiseCancellationError>>;
  cancel(): void;
}

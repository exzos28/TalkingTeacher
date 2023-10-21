import {CommonError} from './CommonError';

export class PromiseCancellationError extends CommonError {
  constructor(public readonly reason?: unknown) {
    super('Promise cancellation error');
    this.name = 'PromiseCancellationError';
  }
}

import {CommonError} from './CommonError';

export class UnknownError extends CommonError {
  constructor(public readonly reason?: unknown) {
    super(`Unknown error: ${reason}`);
    this.name = 'UnknownError';
  }
}

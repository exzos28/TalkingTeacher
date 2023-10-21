import {CommonError} from './CommonError';

export const JSON_PARSE_ERROR = Symbol();
export const JSON_STRINGIFY_ERROR = Symbol();

export class JsonError extends CommonError {
  constructor(
    message: string,
    public readonly kind: typeof JSON_PARSE_ERROR | typeof JSON_STRINGIFY_ERROR,
  ) {
    super(message);
    this.name = 'JsonError';
  }
}

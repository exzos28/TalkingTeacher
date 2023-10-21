export class CommonError extends Error {
  protected constructor(...args: ConstructorParameters<ErrorConstructor>) {
    super(...args);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CommonError';
  }
}

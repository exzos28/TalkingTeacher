import {JsonSerializable, JsonString} from './JsonSubject';

export interface Json {
  parse<T extends JsonSerializable = JsonSerializable>(
    source: JsonString<T>,
  ): T;
  stringify<T extends JsonSerializable = JsonSerializable>(
    source: T,
    space?: string | number,
  ): JsonString<T>;
}

import {Json} from './Json';
import {JsonSerializable, JsonString} from './JsonSubject';
import {JSON_PARSE_ERROR, JSON_STRINGIFY_ERROR, JsonError} from '../Error';

export default class JsonImpl implements Json {
  parse<T extends JsonSerializable = JsonSerializable>(
    source: JsonString<T>,
  ): T {
    try {
      return JSON.parse(source);
    } catch (raw) {
      throw new JsonError('Error while parsing data', JSON_PARSE_ERROR);
    }
  }

  stringify<T extends JsonSerializable = JsonSerializable>(
    source: T,
    space?: string | number,
  ): JsonString<T> {
    try {
      return JSON.stringify(source, undefined, space) as JsonString<T>;
    } catch (raw) {
      throw new JsonError('Error while parsing data', JSON_STRINGIFY_ERROR);
    }
  }
}

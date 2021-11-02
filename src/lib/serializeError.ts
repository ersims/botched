import VError from 'verror';
import BotchedError from './BotchedError';

// Types
export interface SerializedErrorObject {
  name?: string;
  stack?: string;
  info?: object;
  cause?: SerializedErrorObject | null;
  id?: BotchedError['id'];
  code?: BotchedError['code'];
  title?: BotchedError['title'];
  source?: BotchedError['source'];
  links?: BotchedError['links'];
  meta?: BotchedError['meta'];
  statusCode?: BotchedError['statusCode'];
  headers?: BotchedError['headers'];
  isServer?: BotchedError['isServer'];
  isBotched?: BotchedError['isBotched'];
  [key: string]: any;
}
export interface SerializeErrorOptions {
  maxDepth?: number;
  fullStack?: boolean;
}
export interface SerializableError {
  [key: string]: any;
}

// Init
const ignoreProperties = ['jse_info', 'jse_cause', 'jse_shortmsg'];

/**
 * Add extra properties that might give additional -useful- information
 *
 * @param {object} source
 */
function getExtraProps(source: SerializableError): [string, object | null][] {
  const out = ['name', 'message', 'stack', 'code'].reduce<[string, object | null][]>(
    (acc, knownProp) => {
      if (typeof source[knownProp] === 'string') acc.push([knownProp, source[knownProp]]);
      return acc;
    },
    [],
  );
  if (source instanceof Error) {
    if (!(source as SerializableError).info) out.push(['info', VError.info(source)]);
    if (typeof (source as VError).cause === 'function')
      out.push(['cause', (source as VError).cause() || null]);
  }

  return out;
}

/**
 * Serialize the error object recursively up to maxDepth
 *
 * @param {object} source
 * @param {number} maxDepth
 * @param {WeakSet} circularRef
 */
function smartSerialize<T extends object>(
  source: T,
  maxDepth: number,
  circularRef = new WeakSet<T>(),
): SerializedErrorObject | any {
  if (maxDepth === 0) return '[TooDeep]';
  circularRef.add(source);

  const extraProps = getExtraProps(source);
  return Object.entries(source)
    .concat(extraProps)
    .reduce<{ [key: string]: object | string | number | undefined | null }>((acc, [key, value]) => {
      if (typeof value !== 'function' && !ignoreProperties.includes(key)) {
        if (!value || typeof value !== 'object') acc[key] = value;
        else if (!circularRef.has(value))
          acc[key] = smartSerialize(value, maxDepth - 1, circularRef);
        else acc[key] = '[Circular]';
      }
      return acc;
    }, {});
}

/**
 * Create an error serializer
 *
 * @param {SerializeErrorOptions} options - use maxDepth -1 for infinite depth
 * @returns {Function}
 */
function createSerializer(
  options?: SerializeErrorOptions,
): (error: Error & Partial<BotchedError>) => SerializedErrorObject {
  const opts = { fullStack: true, maxDepth: 10, ...options };
  return function serialize(error: Error & Partial<BotchedError>): SerializedErrorObject {
    const serializedError = smartSerialize(error, opts.maxDepth);
    return {
      ...serializedError,
      stack: opts.fullStack ? VError.fullStack(error) : serializedError.stack,
    };
  };
}

// Exports
export default createSerializer;

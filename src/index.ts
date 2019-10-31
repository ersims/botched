import VError from 'verror';
import BotchedError, { ErrorOptions } from './lib/BotchedError';
import botch from './lib/botch';
import getStatusCode from './lib/getStatusCode';
import isBotched from './lib/isBotched';
import createError, { StatusCodeToHttpError } from './lib/createError';
import createSerializer from './lib/serializeError';
import serializeJSONAPIError from './lib/serializeJSONAPIError';

// Exports
export * from './lib/HttpErrors';
export {
  botch,
  getStatusCode,
  isBotched,
  createError,
  BotchedError,
  ErrorOptions,
  StatusCodeToHttpError,
  VError,
  createSerializer,
  serializeJSONAPIError,
};

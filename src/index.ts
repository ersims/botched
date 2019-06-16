import VError from 'verror';
import BotchedError, { ErrorOptions } from './lib/BotchedError';
import botch from './lib/botch';
import wrap from './lib/wrap';
import getStatusCode from './lib/getStatusCode';
import isBotched from './lib/isBotched';
import createError, { StatusCodeToHttpError } from './lib/createError';
import createSerializer from './lib/serializeError';

// Exports
export * from './lib/HttpErrors';
export {
  botch,
  wrap,
  getStatusCode,
  isBotched,
  createError,
  BotchedError,
  ErrorOptions,
  StatusCodeToHttpError,
  VError,
  createSerializer,
};

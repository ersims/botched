// Imports
import VError from 'verror';
import GenericError from './lib/GenericError';
import HttpError, { HttpErrorOptions } from './lib/HttpError';
import botch from './lib/botch';
import createHttpError, { StatusCodeToHttpError } from './lib/createHttpError';
import createSerializer from './lib/serializeError';

// Exports
export * from './lib/HttpErrors';
export {
  botch,
  createHttpError,
  GenericError,
  HttpError,
  HttpErrorOptions,
  StatusCodeToHttpError,
  VError,
  createSerializer,
};

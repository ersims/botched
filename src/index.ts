// Imports
import GenericError from './lib/GenericError';
import HttpError, { HttpErrorOptions } from './lib/HttpError';
import botch from './lib/botch';
import createHttpError, { StatusCodeToHttpError } from './lib/createHttpError';
import createSerializer from './lib/serializeError';
import VError from 'verror';

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

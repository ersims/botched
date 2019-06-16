import VError from 'verror';
import GenericError from './lib/GenericError';
import HttpError, { HttpErrorOptions } from './lib/HttpError';
import botch from './lib/botch';
import wrap from './lib/wrap';
import getStatusCode from './lib/getStatusCode';
import createHttpError, { StatusCodeToHttpError } from './lib/createHttpError';
import createSerializer from './lib/serializeError';

// Exports
export * from './lib/HttpErrors';
export {
  botch,
  wrap,
  getStatusCode,
  createHttpError,
  GenericError,
  HttpError,
  HttpErrorOptions,
  StatusCodeToHttpError,
  VError,
  createSerializer,
};

// Dependencies
import VError from 'verror';
import * as Exports from '../../../src';
import GenericError from '../../../src/lib/GenericError';
import HttpError from '../../../src/lib/HttpError';
import createHttpError from '../../../src/lib/createHttpError';
import * as HttpErrors from '../../../src/lib/HttpErrors';

// Tests
it('should export core error classes', () => {
  expect(Exports.GenericError).toBe(GenericError);
  expect(Exports.HttpError).toBe(HttpError);
});
it('should export createHttpError helper', () => {
  expect(Exports.createHttpError).toBe(createHttpError);
});
it('should export all Error classes', () => {
  expect(Exports).toEqual(expect.objectContaining(HttpErrors));
});
it('should export VError from `verror`', () => {
  expect(Exports.VError).toBe(VError);
});

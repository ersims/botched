import VError from 'verror';
import * as Exports from '../../../src';
import BotchedError from '../../../src/lib/BotchedError';
import createError from '../../../src/lib/createError';
import createSerializer from '../../../src/lib/serializeError';
import getStatusCode from '../../../src/lib/getStatusCode';
import isBotched from '../../../src/lib/isBotched';
import botch from '../../../src/lib/botch';
import wrap from '../../../src/lib/wrap';
import * as HttpErrors from '../../../src/lib/HttpErrors';

// Tests
it('should export BotchedError', () => {
  expect(Exports.BotchedError).toBe(BotchedError);
});
it('should export createError helper', () => {
  expect(Exports.createError).toBe(createError);
});
it('should export createSerializer helper', () => {
  expect(Exports.createSerializer).toBe(createSerializer);
});
it('should export getStatusCode helper', () => {
  expect(Exports.getStatusCode).toBe(getStatusCode);
});
it('should export isBotched helper', () => {
  expect(Exports.isBotched).toBe(isBotched);
});
it('should export botch helper', () => {
  expect(Exports.botch).toBe(botch);
});
it('should export wrap helper', () => {
  expect(Exports.wrap).toBe(wrap);
});
it('should export all Error classes', () => {
  expect(Exports).toEqual(expect.objectContaining(HttpErrors));
});
it('should export VError from `verror`', () => {
  expect(Exports.VError).toBe(VError);
});

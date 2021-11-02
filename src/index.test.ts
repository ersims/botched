import VError from 'verror';
import * as Exports from './index';
import BotchedError from './lib/BotchedError';
import createError from './lib/createError';
import createSerializer from './lib/serializeError';
import getStatusCode from './lib/getStatusCode';
import isBotched from './lib/isBotched';
import botch from './lib/botch';
import wrap from './lib/wrap';
import * as HttpErrors from './lib/HttpErrors';

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
  // One export is httpErrorCodes - everything else should be the errors
  expect(Object.keys(HttpErrors)).toHaveLength(41 + 1);
  expect(Exports).toEqual(expect.objectContaining(HttpErrors));
});
it('should export VError from `verror`', () => {
  expect(Exports.VError).toBe(VError);
});

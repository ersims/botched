// Dependencies
import botch from '../../../src/lib/botch';
import GenericError from '../../../src/lib/GenericError';
import InternalServerError from '../../../src/lib/HttpErrors/InternalServerError';

// Tests
it('should not touch a botched error', () => {
  const error = new GenericError('My Message');
  const botchedError = botch(error);
  expect(error.isBotched).toBe(true);
  expect(botchedError.isBotched).toBe(true);
  expect(error).toBe(botchedError);
});
it('should not touch a botched http error', () => {
  const error = new InternalServerError('My Message');
  const botchedError = botch(error);
  expect(error.isBotched).toBe(true);
  expect(botchedError.isBotched).toBe(true);
  expect(error).toBe(botchedError);
});
it('should create a botched error if the error was generic', () => {
  const error: any = new Error('My Message');
  const botchedError = botch(error);
  expect(error.isBotched).toBe(undefined);
  expect(botchedError.isBotched).toBe(true);
  expect(error).not.toBe(botchedError);
  expect(botchedError.cause()).toBe(error);
});

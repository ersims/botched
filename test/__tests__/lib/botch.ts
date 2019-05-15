// Dependencies
import botch from '../../../src/lib/botch';
import GenericError from '../../../src/lib/GenericError';
import { MultiError, VError } from 'verror';
import { Forbidden, GatewayTimeout, InternalServerError, UnprocessableEntity } from '../../../src/lib/HttpErrors';

// Tests
describe('HttpError', () => {
  it('should not touch a botched http error', () => {
    const error = new UnprocessableEntity('My Message');
    const botchedError = botch(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(422);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
  it('should not hide the details of a botched internal server error', () => {
    const error = new InternalServerError('My Message');
    const botchedError = botch(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
});
describe('GenericError', () => {
  it('should create a botched http error if the error was GenericError', () => {
    const error = new GenericError('My Message');
    const botchedError = botch(error);
    expect(error.isBotched).toBe(true);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError instanceof InternalServerError).toBe(true);
  });
});
describe('Vanilla Error', () => {
  it('should create a botched http error if the error was a vanilla error', () => {
    const error = new Error('My Message');
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
  });
  it('should respect additional data', () => {
    const error: any = new Error('My Message');
    error.data = { status: 418 };
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(418);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(error);
  });
});
describe('MultiError', () => {
  it('should create a botched http error', () => {
    const error = new MultiError([new Error('My First Error'), new Error('My Second Error')]);
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
  });
  it('should respect the errors status code', () => {
    const myCustomError: any = new Error('My First Error With Status 422');
    myCustomError.data = { status: 422 };
    const error = new MultiError([
      myCustomError,
      new VError({ info: { status: 422 } }, 'My Almost Real Http Error'),
      new UnprocessableEntity('My Real Http Error'),
    ]);
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(422);
    expect(botchedError.detail).toBe('first of 3 errors: My First Error With Status 422');
    expect(botchedError.cause()).toBe(error);
  });
  it('should default to status code 400 if there are only errors in the 400 range (and different)', () => {
    const myCustomError: any = new Error('My First Error With Status 418');
    myCustomError.data = { status: 418 };
    const error = new MultiError([
      myCustomError,
      new VError({ info: { status: 422 } }, 'My Almost Real Http Error'),
      new UnprocessableEntity('My Real Http Error'),
      new Forbidden('Forbidden Error'),
    ]);
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(400);
    expect(botchedError.detail).toBe('first of 4 errors: My First Error With Status 418');
    expect(botchedError.cause()).toBe(error);
  });
  it('should default to status code 500 if there are at least one error in the 500 range', () => {
    const myCustomError: any = new Error('My First Error With Status 418');
    myCustomError.data = { status: 418 };
    const error = new MultiError([
      myCustomError,
      new VError({ info: { status: 422 } }, 'My Almost Real Http Error'),
      new UnprocessableEntity('My Real Http Error'),
      new Forbidden('Forbidden Error'),
      new GatewayTimeout('Gateway timeout'),
    ]);
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
  });
});

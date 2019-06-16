import { MultiError, VError } from 'verror';
import BotchedError from '../../../src/lib/BotchedError';
import { Forbidden, GatewayTimeout, UnprocessableEntity } from '../../../src/lib/HttpErrors';
import getStatusCode from '../../../src/lib/getStatusCode';

// Tests
describe('BotchedError', () => {
  it('should use the provided status code', () => {
    const error = new UnprocessableEntity('My Message');
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(422);
  });
  it('should default to 500 if the provided status code makes no sense', () => {
    const error = new UnprocessableEntity({ statusCode: 101 }, 'My Message');
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(500);
  });
  it('should default to 500', () => {
    const error = new BotchedError('My Message');
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(500);
  });
});
describe('Vanilla Error', () => {
  it('should default to 500', () => {
    const error = new Error('My Message');
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(500);
  });
  it('should respect status on error', () => {
    const error: any = new Error('My Message');
    error.status = 418;
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(418);
  });
  it('should respect status code on error', () => {
    const error: any = new Error('My Message');
    error.statusCode = 418;
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(418);
  });
  it('should respect status on error data property', () => {
    const error: any = new Error('My Message');
    error.data = { status: 418 };
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(418);
  });
  it('should respect status code on error data property', () => {
    const error: any = new Error('My Message');
    error.data = { status: 418 };
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(418);
  });
});
describe('VError', () => {
  it('should respect status on info', () => {
    const error = new VError({ info: { status: 418 } }, 'My Message');
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(418);
  });
  it('should respect status code on info', () => {
    const error = new VError({ info: { statusCode: 418 } }, 'My Message');
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(418);
  });
});
describe('MultiError', () => {
  it('should respect the errors status codes', () => {
    const myCustomError: any = new Error('My First Error With Status 422');
    myCustomError.data = { status: 422 };
    const error = new MultiError([
      myCustomError,
      new VError({ info: { status: 422 } }, 'My Almost Real Http Error'),
      new UnprocessableEntity('My Real Http Error'),
    ]);
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(422);
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
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(400);
  });
  it('should default to status code 500 if there are at least one error without a specific status code (default to 500)', () => {
    const myCustomError = new Error('My Error Without A Status Code');
    const error = new MultiError([
      new VError({ info: { status: 422 } }, 'My Almost Real Http Error'),
      new UnprocessableEntity('My Real Http Error'),
      new Forbidden('Forbidden Error'),
      new GatewayTimeout('Gateway timeout'),
      myCustomError,
    ]);
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(500);
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
    const statusCode = getStatusCode(error);
    expect(statusCode).toBe(500);
  });
});

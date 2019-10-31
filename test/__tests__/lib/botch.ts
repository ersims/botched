import { MultiError, VError } from 'verror';
import botch, { MaybeDetailedError } from '../../../src/lib/botch';
import { InternalServerError, UnprocessableEntity } from '../../../src/lib/HttpErrors';
import getStatusCode from '../../../src/lib/getStatusCode';

// Mocks
jest.mock('../../../src/lib/getStatusCode');
const getStatusCodeMock = getStatusCode as jest.Mock;

// Init
const detailedError: MaybeDetailedError = new Error('My Message');
detailedError.id = 'my-id';
detailedError.code = 'my-code';
detailedError.title = 'my-title';
detailedError.source = {
  pointer: '/data',
  parameter: 'key',
};
detailedError.links = {
  about: '/docs/error/my-id',
};
detailedError.meta = {
  random: 'data to be displayed',
};
detailedError.status = 498;

// Tests
it('should use getStatusCode for status codes', () => {
  // Force change status code
  getStatusCodeMock.mockReturnValueOnce(499);
  const botchedError = botch(detailedError);

  // Assertions
  expect(botchedError.status).toBe(499);
  expect(getStatusCodeMock).toHaveBeenCalledWith(expect.objectContaining({ status: 498 }));
});
it('should only inherit status by default', () => {
  // Force change status code
  getStatusCodeMock.mockReturnValueOnce(498);
  const botchedError = botch(detailedError);

  // Assertions
  expect(botchedError.isBotched).toBe(true);
  expect(botchedError.cause()).toBe(detailedError);
  expect(botchedError.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(botchedError.code).toBe('BotchedError');
  expect(botchedError.status).toBe(498);
  expect(botchedError.title).toBe('Internal Server Error');
  expect(botchedError.detail).toBeUndefined();
  expect(botchedError.source).toBeUndefined();
  expect(botchedError.links).toBeUndefined();
  expect(botchedError.meta).toBeUndefined();
});
it('should inherit properties when using `useUnsafeErrorProps`', () => {
  // Force change status code
  getStatusCodeMock.mockReturnValueOnce(497);
  const botchedError = botch(detailedError, { useUnsafeErrorProps: true });

  // Assertions
  expect(botchedError.isBotched).toBe(true);
  expect(botchedError.cause()).toBe(detailedError);
  expect(botchedError.id).toBe('my-id');
  expect(botchedError.code).toBe('my-code');
  expect(botchedError.status).toBe(497);
  expect(botchedError.title).toBe('my-title');
  expect(botchedError.detail).toBe('My Message');
  expect(botchedError.source).toEqual({
    pointer: '/data',
    parameter: 'key',
  });
  expect(botchedError.links).toEqual({
    about: '/docs/error/my-id',
  });
  expect(botchedError.meta).toEqual({
    random: 'data to be displayed',
  });
});
describe('BotchedError', () => {
  it('should not touch a botched http error with status 400-499', () => {
    const error = new UnprocessableEntity('My Message');
    const botchedError = botch(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.status).toBe(422);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
  it('should not touch a botched http error with status >= 500', () => {
    const error = new InternalServerError('My Message');
    const botchedError = botch(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.status).toBe(500);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
  it('should not touch a BotchedError with invalid statusCode', () => {
    const error = new InternalServerError({ status: 101 }, 'My Message');
    const botchedError = botch(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.status).toBe(101);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
});
describe('Vanilla Error', () => {
  it('should create a botched http internal server error', () => {
    const error = new Error('My Message');
    const botchedError = botch(error);

    // Assertions
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError).toBeInstanceOf(InternalServerError);
    expect(botchedError.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.status).toBe(500);
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBeUndefined();
    expect(botchedError.source).toBeUndefined();
    expect(botchedError.links).toBeUndefined();
    expect(botchedError.meta).toBeUndefined();
  });
});
describe('VError', () => {
  it('should create a botched http error', () => {
    const error = new VError('My Message');
    const botchedError = botch(error);

    // Assertions
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError).toBeInstanceOf(InternalServerError);
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.status).toBe(500);
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBeUndefined();
    expect(botchedError.source).toBeUndefined();
    expect(botchedError.links).toBeUndefined();
    expect(botchedError.meta).toBeUndefined();
  });
  it('should inherit details from the cause info', () => {
    const error = new VError(
      {
        info: {
          id: 'my-id',
          code: 'my-code',
          title: 'my-title',
          source: {
            pointer: '/data',
            parameter: 'key',
          },
          links: {
            about: '/docs/error/my-id',
          },
          meta: {
            random: 'data to be displayed',
          },
        },
      },
      'My Error',
    );

    const botchedError = botch(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).toBe('my-id');
    expect(botchedError.code).toBe('my-code');
    expect(botchedError.status).toBe(500);
    expect(botchedError.title).toBe('my-title');
    expect(botchedError.detail).toBe('My Error');
    expect(botchedError.source).toEqual({
      pointer: '/data',
      parameter: 'key',
    });
    expect(botchedError.links).toEqual({
      about: '/docs/error/my-id',
    });
    expect(botchedError.meta).toEqual({
      random: 'data to be displayed',
    });
  });
});
describe('MultiError', () => {
  it('should create a botched http error', () => {
    const error = new MultiError([new Error('My First Error'), new Error('My Second Error')]);
    const botchedError = botch(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.status).toBe(500);
    expect(botchedError.detail).toBe('first of 2 errors: My First Error');
    expect(botchedError.cause()).toBe(error);
    expect(botchedError).toBeInstanceOf(InternalServerError);
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
  it('should inherit details from the cause', () => {
    const error: any = new MultiError([new Error('My First Error'), new Error('My Second Error')]);
    Object.assign(error, {
      id: 'my-id',
      code: 'my-code',
      title: 'my-title',
      source: {
        pointer: '/data',
        parameter: 'key',
      },
      links: {
        about: '/docs/error/my-id',
      },
      meta: {
        random: 'data to be displayed',
      },
    });

    const botchedError = botch(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).toBe('my-id');
    expect(botchedError.code).toBe('my-code');
    expect(botchedError.status).toBe(500);
    expect(botchedError.title).toBe('my-title');
    expect(botchedError.detail).toBe('first of 2 errors: My First Error');
    expect(botchedError.source).toEqual({
      pointer: '/data',
      parameter: 'key',
    });
    expect(botchedError.links).toEqual({
      about: '/docs/error/my-id',
    });
    expect(botchedError.meta).toEqual({
      random: 'data to be displayed',
    });
  });
  it('should inherit details from the cause data property', () => {
    const error: any = new MultiError([new Error('My First Error'), new Error('My Second Error')]);
    error.data = {
      id: 'my-id',
      code: 'my-code',
      title: 'my-title',
      source: {
        pointer: '/data',
        parameter: 'key',
      },
      links: {
        about: '/docs/error/my-id',
      },
      meta: {
        random: 'data to be displayed',
      },
    };

    const botchedError = botch(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).toBe('my-id');
    expect(botchedError.code).toBe('my-code');
    expect(botchedError.status).toBe(500);
    expect(botchedError.title).toBe('my-title');
    expect(botchedError.detail).toBe('first of 2 errors: My First Error');
    expect(botchedError.source).toEqual({
      pointer: '/data',
      parameter: 'key',
    });
    expect(botchedError.links).toEqual({
      about: '/docs/error/my-id',
    });
    expect(botchedError.meta).toEqual({
      random: 'data to be displayed',
    });
  });
});

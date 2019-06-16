import { MultiError, VError } from 'verror';
import wrap from '../../../src/lib/wrap';
import { InternalServerError, UnprocessableEntity } from '../../../src/lib/HttpErrors';
import getStatusCode from '../../../src/lib/getStatusCode';

// Mocks
jest.mock('../../../src/lib/getStatusCode');

// Tests
it('should use getStatusCode for status codes', () => {
  // Force change status code
  (getStatusCode as jest.Mock).mockReturnValueOnce(499);
  const error = new Error('My Message');
  const botchedError = wrap(error);
  expect(botchedError.statusCode).toBe(499);
});
describe('BotchedError', () => {
  it('should not touch a BotchedError of statusCode 400-499', () => {
    const error = new UnprocessableEntity('My Message');
    const botchedError = wrap(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(422);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
  it('should not touch a BotchedError of statusCode >= 500', () => {
    const error = new InternalServerError('My Message');
    const botchedError = wrap(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
  it('should not touch a BotchedError invalid statusCode', () => {
    const error = new InternalServerError({ statusCode: 101 }, 'My Message');
    const botchedError = wrap(error);
    expect(error.isBotched).toBe(true);
    expect(error).toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(101);
    expect(botchedError.detail).toBe('My Message');
    expect(botchedError.cause()).toBe(undefined);
  });
});
describe('Vanilla Error', () => {
  it('should create a botched http error', () => {
    const error = new Error('My Message');
    const botchedError = wrap(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError instanceof InternalServerError).toBe(true);
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
  it('should NOT inherit details from the cause', () => {
    const error: any = new Error('My Error');
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

    const botchedError = wrap(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).not.toBe('my-id');
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.status).toBe('500');
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
  it('should NOT inherit details from the cause data property', () => {
    const error: any = new Error('My Error');
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

    const botchedError = wrap(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).not.toBe('my-id');
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.status).toBe('500');
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
});
describe('VError', () => {
  it('should create a botched http error', () => {
    const error = new VError('My Message');
    const botchedError = wrap(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError instanceof InternalServerError).toBe(true);
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
  it('should NOT inherit details from the cause info', () => {
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

    const botchedError = wrap(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).not.toBe('my-id');
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.status).toBe('500');
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
});
describe('MultiError', () => {
  it('should create a botched http error', () => {
    const error = new MultiError([new Error('My First Error'), new Error('My Second Error')]);
    const botchedError = wrap(error);
    expect(error).not.toBe(botchedError);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError instanceof InternalServerError).toBe(true);
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
  it('should NOT inherit details from the cause', () => {
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

    const botchedError = wrap(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).not.toBe('my-id');
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.status).toBe('500');
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
  it('should NOT inherit details from the cause data property', () => {
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

    const botchedError = wrap(error);
    expect(botchedError.isBotched).toBe(true);
    expect(botchedError.cause()).toBe(error);
    expect(botchedError.id).not.toBe('my-id');
    expect(botchedError.code).toBe('InternalServerError');
    expect(botchedError.statusCode).toBe(500);
    expect(botchedError.status).toBe('500');
    expect(botchedError.title).toBe('Internal Server Error');
    expect(botchedError.detail).toBe(undefined);
    expect(botchedError.source).toEqual(undefined);
    expect(botchedError.links).toEqual(undefined);
    expect(botchedError.meta).toEqual(undefined);
  });
});

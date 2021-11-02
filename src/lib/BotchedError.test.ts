import BotchedError from './BotchedError';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

// Tests
it('should have a version number', () => {
  const error = new BotchedError('My Error');
  expect(BotchedError.version).toBe(version);
  expect(error.version).toBeDefined();
  expect(error.version).toBe(BotchedError.version);
});
it('should have sane defaults', () => {
  const error = new BotchedError('My Error');
  expect(error.name).toBe('BotchedError');
  expect(error.id).toMatch(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  );
  expect(error.code).toBe('BotchedError');
  expect(error.statusCode).toBe(500);
  expect(error.status).toBe('500');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe('My Error');
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});
it('should generate unique ids', () => {
  const error1 = new BotchedError('My Error');
  const error2 = new BotchedError('My Error');
  expect(error1.id).toMatch(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  );
  expect(error2.id).toMatch(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  );
  expect(error1.id).not.toEqual(error2.id);
});
it('should support additional data', () => {
  const error = new BotchedError(
    {
      id: 'my-id',
      code: 'my-code',
      title: 'my-title',
      statusCode: 451,
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
    'My Error',
  );
  expect(error.id).toBe('my-id');
  expect(error.code).toBe('my-code');
  expect(error.title).toBe('my-title');
  expect(error.statusCode).toBe(451);
  expect(error.status).toBe('451');
  expect(error.detail).toBe('My Error');
  expect(error.source).toEqual({
    pointer: '/data',
    parameter: 'key',
  });
  expect(error.links).toEqual({
    about: '/docs/error/my-id',
  });
  expect(error.meta).toEqual({
    random: 'data to be displayed',
  });
});
it('should NOT inherit from the cause', () => {
  const errorCause = new BotchedError(
    {
      id: 'my-id',
      code: 'my-code',
      title: 'my-title',
      statusCode: 451,
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
    'My Error',
  );
  const error = new BotchedError(
    { cause: errorCause, id: 'my-new-id', statusCode: 400 },
    'My New Error',
  );
  expect(error.id).toBe('my-new-id');
  expect(error.code).toBe('BotchedError');
  expect(error.statusCode).toBe(400);
  expect(error.status).toBe('400');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe('My New Error');
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});
it('should serialize to JSON:API spec', () => {
  const error = new BotchedError(
    {
      id: 'my-id',
      code: 'my-code',
      title: 'my-title',
      statusCode: 451,
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
      info: {
        secretInfo: {
          key: '123',
        },
      },
    },
    'My Error',
  );
  const out = error.toJSON();
  expect(out).toEqual({
    id: 'my-id',
    code: 'my-code',
    title: 'my-title',
    detail: 'My Error',
    status: '451',
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
});
it('should have convenience property `isServer`', () => {
  const error1 = new BotchedError({ statusCode: 451 }, 'My Error');
  const error2 = new BotchedError({ statusCode: 500 }, 'My Error');
  const error3 = new BotchedError({ statusCode: 501 }, 'My Error');
  expect(error1.isServer).toBe(false);
  expect(error2.isServer).toBe(true);
  expect(error3.isServer).toBe(true);
});
it('should work without error message', () => {
  const error = new BotchedError();
  expect(error.message).toBe('');
  expect(error.name).toBe('BotchedError');
  expect(error.id).toMatch(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  );
  expect(error.code).toBe('BotchedError');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe(undefined);
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});

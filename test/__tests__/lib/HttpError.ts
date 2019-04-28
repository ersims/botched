// Dependencies
import HttpError from '../../../src/lib/HttpError';

// Tests
it('should have sane defaults', () => {
  const error = new HttpError('My Error');
  expect(error.name).toBe('HttpError');
  expect(error.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(error.code).toBe('HttpError');
  expect(error.statusCode).toBe(500);
  expect(error.status).toBe('500');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe('My Error');
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});
it('should support additional data', () => {
  const error = new HttpError(
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
it('should inherit data from child', () => {
  const childError = new HttpError(
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
  const error = new HttpError({ cause: childError, id: 'my-new-id', statusCode: 400 }, 'My New Error');
  expect(error.id).toBe('my-new-id');
  expect(error.code).toBe('my-code');
  expect(error.statusCode).toBe(400);
  expect(error.status).toBe('400');
  expect(error.title).toBe('my-title');
  expect(error.detail).toBe('My New Error');
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
it('should serialize to JSON:API spec', () => {
  const error = new HttpError(
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
  const error1 = new HttpError({ statusCode: 451 }, 'My Error');
  const error2 = new HttpError({ statusCode: 500 }, 'My Error');
  const error3 = new HttpError({ statusCode: 501 }, 'My Error');
  expect(error1.isServer).toBe(false);
  expect(error2.isServer).toBe(true);
  expect(error3.isServer).toBe(true);
});

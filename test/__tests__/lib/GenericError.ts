import GenericError from '../../../src/lib/GenericError';

// Tests
it('should have sane defaults', () => {
  const error = new GenericError('My Error');
  expect(error.name).toBe('GenericError');
  expect(error.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(error.code).toBe('GenericError');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe('My Error');
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});
it('should generate unique ids', () => {
  const error1 = new GenericError('My Error');
  const error2 = new GenericError('My Error');
  expect(error1.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(error2.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(error1.id).not.toEqual(error2.id);
});
it('should support additional data', () => {
  const error = new GenericError(
    {
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
    'My Error',
  );
  expect(error.id).toBe('my-id');
  expect(error.code).toBe('my-code');
  expect(error.title).toBe('my-title');
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
  const errorCause = new GenericError(
    {
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
    'My Error',
  );
  const error = new GenericError({ cause: errorCause, id: 'my-new-id' }, 'My New Error');
  expect(error.id).toBe('my-new-id');
  expect(error.code).toBe('GenericError');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe('My New Error');
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});
it('should serialize to JSON:API spec', () => {
  const error = new GenericError(
    {
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
it('should have convenience property `isBotched`', () => {
  const error = new GenericError('My Error');
  const defaultError = new Error('My Error');
  expect((defaultError as any).isBotched).toBe(undefined);
  expect(error.isBotched).toBe(true);
});
it('should work without error message', () => {
  const error = new GenericError();
  expect(error.message).toBe('');
  expect(error.name).toBe('GenericError');
  expect(error.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(error.code).toBe('GenericError');
  expect(error.title).toBe('Internal Server Error');
  expect(error.detail).toBe(undefined);
  expect(error.source).toBe(undefined);
  expect(error.links).toBe(undefined);
  expect(error.meta).toBe(undefined);
});

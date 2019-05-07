// Dependencies
import createSerializer from '../../../src/lib/serializeError';
import BadRequest from '../../../src/lib/HttpErrors/BadRequest';
import InternalServerError from '../../../src/lib/HttpErrors/InternalServerError';

// Create a default serializer for re-use
const serialize = createSerializer();

// Tests
it('should create a serializer', () => {
  const error = new Error('My Message');
  const mySerializer = createSerializer();
  const serializedError = mySerializer(error);
  expect(serializedError).toEqual({
    info: {},
    message: 'My Message',
    name: 'Error',
    stack: expect.stringContaining('Error: My Message'),
  });
});
it('should support specifying max depth', () => {
  const error: any = new Error('My Message');
  error.nested = new Error('My Nested Message');
  error.nested.nested = new Error('My Double Nested Message');
  const mySerializer = createSerializer({ maxDepth: 1 });
  const serializedError = mySerializer(error);
  expect(serializedError).toEqual({
    info: '[TooDeep]',
    message: 'My Message',
    name: 'Error',
    stack: expect.stringContaining('Error: My Message'),
    nested: '[TooDeep]',
  });
});
it('should support disabling full stack', () => {
  const err = new Error('My Nested Message');
  const error = new InternalServerError({ cause: err }, 'My Message');
  const mySerializer = createSerializer({ fullStack: false });
  const serializedError = mySerializer(error);
  expect(serializedError).toEqual({
    info: {},
    message: 'My Message',
    name: 'InternalServerError',
    code: 'InternalServerError',
    statusCode: 500,
    title: 'Internal Server Error',
    headers: {},
    meta: undefined,
    source: undefined,
    links: undefined,
    id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
    isBotched: true,
    isServer: true,
    stack: expect.not.stringContaining('Error: My Nested Message'),
    cause: {
      info: {},
      message: 'My Nested Message',
      name: 'Error',
      stack: expect.stringContaining('Error: My Nested Message'),
    },
  });
});
it('should support vanilla Error objects', () => {
  const error = new Error('My Message');
  const serializedError = serialize(error);
  expect(serializedError).toEqual({
    info: {},
    message: 'My Message',
    name: 'Error',
    stack: expect.stringContaining('Error: My Message'),
  });
});
it('should not overwrite props used by our own error objects if set', () => {
  const error: any = new Error('My Message');
  error.info = {
    myOwnInfo: 'something',
  };
  const serializedError = serialize(error);
  expect(serializedError).toEqual({
    info: {
      myOwnInfo: 'something',
    },
    message: 'My Message',
    name: 'Error',
    stack: expect.stringContaining('Error: My Message'),
  });
});
it('should support nested Error objects', () => {
  const error: any = new Error('My Message');
  error.nested = new Error('My Nested Message');
  error.nested.nested = new Error('My Double Nested Message');
  const serializedError = serialize(error);
  expect(serializedError).toEqual({
    info: {},
    message: 'My Message',
    name: 'Error',
    stack: expect.stringContaining('Error: My Message'),
    nested: {
      info: {},
      message: 'My Nested Message',
      name: 'Error',
      stack: expect.stringContaining('Error: My Nested Message'),
      nested: {
        info: {},
        message: 'My Double Nested Message',
        name: 'Error',
        stack: expect.stringContaining('Error: My Double Nested Message'),
      },
    },
  });
});
it('should support circular references', () => {
  const error: any = new Error('My Message');
  error.nested = new Error('My Nested Message');
  error.nested.nested = new Error('My Double Nested Message');
  error.nested.nested.circular = error.nested;
  const serializedError = serialize(error);
  expect(serializedError).toEqual({
    info: {},
    message: 'My Message',
    name: 'Error',
    stack: expect.stringContaining('Error: My Message'),
    nested: {
      info: {},
      message: 'My Nested Message',
      name: 'Error',
      stack: expect.stringContaining('Error: My Nested Message'),
      nested: {
        info: {},
        message: 'My Double Nested Message',
        name: 'Error',
        stack: expect.stringContaining('Error: My Double Nested Message'),
        circular: '[Circular]',
      },
    },
  });
});
it('should support our own error objects', () => {
  const error: any = new BadRequest(
    {
      info: {
        sensitiveInfo: {
          key: '1234',
        },
      },
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
    'My Big Bad Boom',
  );
  const serializedError = serialize(error);
  expect(serializedError).toEqual({
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
      sensitiveInfo: {
        key: '1234',
      },
    },
    headers: {},
    isBotched: true,
    isServer: false,
    message: 'My Big Bad Boom',
    name: 'BadRequest',
    stack: expect.stringContaining('BadRequest: My Big Bad Boom'),
    cause: null,
  });
});
it('should show the full nested stack by default', () => {
  const err = new Error('My Nested Message');
  const error = new InternalServerError({ cause: err }, 'My Message');
  const serializedError = serialize(error);
  expect(serializedError).toEqual({
    info: {},
    message: 'My Message',
    name: 'InternalServerError',
    code: 'InternalServerError',
    statusCode: 500,
    title: 'Internal Server Error',
    headers: {},
    meta: undefined,
    source: undefined,
    links: undefined,
    id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
    isBotched: true,
    isServer: true,
    stack: expect.stringContaining('Error: My Nested Message'),
    cause: {
      info: {},
      message: 'My Nested Message',
      name: 'Error',
      stack: expect.stringContaining('Error: My Nested Message'),
    },
  });
});

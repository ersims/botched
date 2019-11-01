import { MaybeDetailedError } from '../../../src/lib/botch';
import { wrap } from '../../../src/lib/wrap';
import * as getStatusCodeExports from '../../../src/lib/getStatusCode';
import * as createErrorExports from '../../../src/lib/createError';

// Mocks
jest.spyOn(getStatusCodeExports, 'getStatusCode');
jest.spyOn(createErrorExports, 'createError');
const getStatusCode = getStatusCodeExports.getStatusCode as jest.Mock;
const createError = createErrorExports.createError as jest.Mock;

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
beforeEach(() => {
  getStatusCode.mockClear();
  createError.mockClear();
});
it('should use getStatusCode for status codes', () => {
  // Force override status code
  getStatusCode.mockReturnValueOnce(499);
  const botchedError = wrap(detailedError);

  // Assertions
  expect(botchedError.status).toBe(499);
  expect(getStatusCode).toHaveBeenCalledWith(expect.objectContaining({ status: 498 }));
});
it('should create errors with only cause property by default', () => {
  const botchedError = wrap(detailedError);

  // Assertions
  expect(createError).toHaveBeenCalledWith(498, { cause: detailedError }, undefined);
  expect(botchedError.isBotched).toBe(true);
  expect(botchedError.status).toBe(498);
  expect(botchedError.cause()).toBe(detailedError);
  expect(botchedError.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(botchedError.code).toBe('BotchedError');
  expect(botchedError.title).toBe('Internal Server Error');
  expect(botchedError.message).toBeUndefined();
  expect(botchedError.source).toBeUndefined();
  expect(botchedError.links).toBeUndefined();
  expect(botchedError.meta).toBeUndefined();
});

import { STATUS_CODES } from 'http';
import BotchedError from './BotchedError';
import createError from './createError';

// Get relevant status codes
const errorCodes = Object.keys(STATUS_CODES)
  .map((code) => parseInt(code, 10))
  .filter((code) => code >= 400);

// Explicit overrides
const overrides: { [key: number]: string } = {
  418: "I'm a Teapot",
  425: 'Too Early',
};

// Tests
it('should create all errors from STATUS_CODES', () => {
  const codes = errorCodes.slice(0);
  expect.assertions(codes.length * 5);
  codes.forEach((code) => {
    const error = createError(code);
    expect(error.statusCode).toBe(code);
    expect(error.status).toBe(code.toString());
    expect(error.code).toBe(error.name);
    expect(error.title).toBe(overrides[code] || STATUS_CODES[code]);
    expect(error).toBeInstanceOf(BotchedError);
  });
});
it('should create generic errors if unknown error code is provided', () => {
  const error = createError(599);
  expect(error.statusCode).toBe(599);
  expect(error.status).toBe('599');
  expect(error.title).toBe('Internal Server Error');
  expect(error.name).toBe('BotchedError');
  expect(error).toBeInstanceOf(BotchedError);
});
it('should create generic error if no error code is provided', () => {
  const error = createError();
  expect(error.statusCode).toBe(500);
  expect(error.status).toBe('500');
  expect(error.title).toBe('Internal Server Error');
  expect(error.name).toBe('InternalServerError');
  expect(error).toBeInstanceOf(BotchedError);
});
it('should fail if attempting to create errors with invalid status codes', () => {
  expect(() => createError(399)).toThrow('statusCode must be 400 or greater');
});

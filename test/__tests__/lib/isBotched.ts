import { MultiError, VError, WError } from 'verror';
import BotchedError from '../../../src/lib/BotchedError';
import isBotched from '../../../src/lib/isBotched';
import InternalServerError from '../../../src/lib/HttpErrors/InternalServerError';
import BadRequest from '../../../src/lib/HttpErrors/BadRequest';

// Tests
describe('Botched Errors', () => {
  it('should return true for botched errors', () => {
    const error = new BotchedError('My Message');
    expect(isBotched(error)).toBe(true);
  });
  it('should return true for botched http errors', () => {
    const error = new InternalServerError('My Message');
    const error2 = new BadRequest('My Message');
    expect(isBotched(error)).toBe(true);
    expect(isBotched(error2)).toBe(true);
  });
});
describe('Vanilla Error', () => {
  it('should return false', () => {
    const error = new Error('My Message');
    expect(isBotched(error)).toBe(false);
  });
});
describe('VError', () => {
  it('should return false for VError', () => {
    const error = new VError('My Message');
    expect(isBotched(error)).toBe(false);
  });
  it('should return false for WError', () => {
    const error = new WError('My Message');
    expect(isBotched(error)).toBe(false);
  });
  it('should return false for MultiError', () => {
    const error = new MultiError([new Error('My First Error'), new BotchedError('My Botched sub error')]);
    expect(isBotched(error)).toBe(false);
  });
});

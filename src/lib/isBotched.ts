import BotchedError from './BotchedError';

// Types
export interface MaybeBotchedError {
  isBotched?: boolean;
}

/**
 * Check if error is botched error
 *
 * @param {Error} err
 * @returns {boolean}
 */
function isBotched(err: Error & MaybeBotchedError): err is BotchedError {
  return !!err.isBotched;
}

// Exports
export default isBotched;

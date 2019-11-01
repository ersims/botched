import { BotchedError } from '../BotchedError';

// Exports
export class HTTPVersionNotSupported extends BotchedError {
  /**
   * @override
   */
  public static status = 505;
  public static title = 'HTTP Version Not Supported';
}

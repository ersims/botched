import { BotchedError } from '../BotchedError';

// Exports
export class RequestHeaderFieldsTooLarge extends BotchedError {
  /**
   * @override
   */
  public static status = 431;
  public static title = 'Request Header Fields Too Large';
}

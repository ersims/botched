import { BotchedError } from '../BotchedError';

// Exports
export class RequestTimeout extends BotchedError {
  /**
   * @override
   */
  public static status = 408;
  public static title = 'Request Timeout';
}

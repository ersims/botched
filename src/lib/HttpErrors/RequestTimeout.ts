import BotchedError from '../BotchedError';

// Exports
export class RequestTimeout extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 408;
  public static title = 'Request Timeout';
}

import BotchedError from '../BotchedError';

// Exports
export class MethodNotAllowed extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 405;
  public static title = 'Method Not Allowed';
}

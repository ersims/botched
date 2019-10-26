import BotchedError from '../BotchedError';

// Exports
export class NotFound extends BotchedError {
  /**
   * @override
   */
  public static status = 404;
  public static title = 'Not Found';
}

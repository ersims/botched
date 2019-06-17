import BotchedError from '../BotchedError';

// Exports
export class InsufficientStorage extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 507;
  public static title = 'Insufficient Storage';
}

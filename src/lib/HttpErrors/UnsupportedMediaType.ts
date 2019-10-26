import BotchedError from '../BotchedError';

// Exports
export class UnsupportedMediaType extends BotchedError {
  /**
   * @override
   */
  public static status = 415;
  public static title = 'Unsupported Media Type';
}

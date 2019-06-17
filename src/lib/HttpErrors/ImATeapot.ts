import BotchedError from '../BotchedError';

// Exports
export class ImATeapot extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 418;
  public static title = "I'm a Teapot";
}

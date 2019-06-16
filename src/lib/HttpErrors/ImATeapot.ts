import BotchedError from '../BotchedError';

// Exports
export default class ImATeapot extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 418;
  public static title = "I'm a Teapot";
}

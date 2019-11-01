import { BotchedError } from '../BotchedError';

// Exports
export class ImATeapot extends BotchedError {
  /**
   * @override
   */
  public static status = 418;
  public static title = "I'm a Teapot";
}

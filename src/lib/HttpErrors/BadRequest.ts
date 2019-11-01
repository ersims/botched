import { BotchedError } from '../BotchedError';

// Exports
export class BadRequest extends BotchedError {
  /**
   * @override
   */
  public static status = 400;
  public static title = 'Bad Request';
}

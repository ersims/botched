import { BotchedError } from '../BotchedError';

// Exports
export class UnprocessableEntity extends BotchedError {
  /**
   * @override
   */
  public static status = 422;
  public static title = 'Unprocessable Entity';
}

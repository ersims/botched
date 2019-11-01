import { BotchedError } from '../BotchedError';

// Exports
export class PreconditionRequired extends BotchedError {
  /**
   * @override
   */
  public static status = 428;
  public static title = 'Precondition Required';
}

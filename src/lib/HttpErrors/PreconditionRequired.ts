import BotchedError from '../BotchedError';

// Exports
export class PreconditionRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 428;
  public static title = 'Precondition Required';
}

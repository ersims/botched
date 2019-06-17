import BotchedError from '../BotchedError';

// Exports
export class ExpectationFailed extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 417;
  public static title = 'Expectation Failed';
}

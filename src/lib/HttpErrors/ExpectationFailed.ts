import BotchedError from '../BotchedError';

// Exports
export default class ExpectationFailed extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 417;
  public static title = 'Expectation Failed';
}

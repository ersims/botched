import BotchedError from '../BotchedError';

// Exports
export default class PreconditionFailed extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 412;
  public static title = 'Precondition Failed';
}

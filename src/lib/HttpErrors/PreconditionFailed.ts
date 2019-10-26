import BotchedError from '../BotchedError';

// Exports
export class PreconditionFailed extends BotchedError {
  /**
   * @override
   */
  public static status = 412;
  public static title = 'Precondition Failed';
}

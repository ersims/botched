import BotchedError from '../BotchedError';

// Exports
export default class FailedDependency extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 424;
  public static title = 'Failed Dependency';
}

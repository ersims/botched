import BotchedError from '../BotchedError';

// Exports
export default class UpgradeRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 426;
  public static title = 'Upgrade Required';
}

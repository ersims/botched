import BotchedError from '../BotchedError';

// Exports
export class UpgradeRequired extends BotchedError {
  /**
   * @override
   */
  public static status = 426;
  public static title = 'Upgrade Required';
}

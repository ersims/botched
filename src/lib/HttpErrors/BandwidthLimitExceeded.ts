import BotchedError from '../BotchedError';

// Exports
export class BandwidthLimitExceeded extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 509;
  public static title = 'Bandwidth Limit Exceeded';
}

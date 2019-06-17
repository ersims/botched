import BotchedError from '../BotchedError';

// Exports
export class GatewayTimeout extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 504;
  public static title = 'Gateway Timeout';
}

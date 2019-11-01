import { BotchedError } from '../BotchedError';

// Exports
export class GatewayTimeout extends BotchedError {
  /**
   * @override
   */
  public static status = 504;
  public static title = 'Gateway Timeout';
}

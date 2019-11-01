import { BotchedError } from '../BotchedError';

// Exports
export class BadGateway extends BotchedError {
  /**
   * @override
   */
  public static status = 502;
  public static title = 'Bad Gateway';
}

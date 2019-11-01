import { BotchedError } from '../BotchedError';

// Exports
export class MethodNotAllowed extends BotchedError {
  /**
   * @override
   */
  public static status = 405;
  public static title = 'Method Not Allowed';
}

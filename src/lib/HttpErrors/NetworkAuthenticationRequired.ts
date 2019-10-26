import BotchedError from '../BotchedError';

// Exports
export class NetworkAuthenticationRequired extends BotchedError {
  /**
   * @override
   */
  public static status = 511;
  public static title = 'Network Authentication Required';
}

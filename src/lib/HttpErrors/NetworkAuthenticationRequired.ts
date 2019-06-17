import BotchedError from '../BotchedError';

// Exports
export class NetworkAuthenticationRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 511;
  public static title = 'Network Authentication Required';
}

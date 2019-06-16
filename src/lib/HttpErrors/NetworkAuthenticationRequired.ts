import BotchedError from '../BotchedError';

// Exports
export default class NetworkAuthenticationRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 511;
  public static title = 'Network Authentication Required';
}

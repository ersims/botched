import BotchedError from '../BotchedError';

// Exports
export class ProxyAuthenticationRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 407;
  public static title = 'Proxy Authentication Required';
}

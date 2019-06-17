import BotchedError from '../BotchedError';

// Exports
export class ServiceUnavailable extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 503;
  public static title = 'Service Unavailable';
}

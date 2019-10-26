import BotchedError from '../BotchedError';

// Exports
export class ServiceUnavailable extends BotchedError {
  /**
   * @override
   */
  public static status = 503;
  public static title = 'Service Unavailable';
}

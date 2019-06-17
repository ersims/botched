import BotchedError from '../BotchedError';

// Exports
export class TooManyRequests extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 429;
  public static title = 'Too Many Requests';
}

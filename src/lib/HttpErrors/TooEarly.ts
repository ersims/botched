import { BotchedError } from '../BotchedError';

// Exports
export class TooEarly extends BotchedError {
  /**
   * @override
   */
  public static status = 425;
  public static title = 'Too Early';
}

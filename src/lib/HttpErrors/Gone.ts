import { BotchedError } from '../BotchedError';

// Exports
export class Gone extends BotchedError {
  /**
   * @override
   */
  public static status = 410;
  public static title = 'Gone';
}

import BotchedError from '../BotchedError';

// Exports
export class LoopDetected extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 508;
  public static title = 'Loop Detected';
}

import { BotchedError } from '../BotchedError';

// Exports
export class FailedDependency extends BotchedError {
  /**
   * @override
   */
  public static status = 424;
  public static title = 'Failed Dependency';
}

// Imports
import HttpError from '../HttpError';

// Exports
export default class LoopDetected extends HttpError {
  /**
   * @override
   */
  public static statusCode = 508;
  public static title = 'Loop Detected';
}

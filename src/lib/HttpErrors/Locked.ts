// Imports
import HttpError from '../HttpError';

// Exports
export default class Locked extends HttpError {
  /**
   * @override
   */
  public static statusCode = 423;
  public static title = 'Locked';
}

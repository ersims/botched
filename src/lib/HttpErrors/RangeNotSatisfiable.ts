// Imports
import HttpError from '../HttpError';

// Exports
export default class RangeNotSatisfiable extends HttpError {
  /**
   * @override
   */
  public static statusCode = 416;
  public static title = 'Range Not Satisfiable';
}

// Imports
import HttpError from '../HttpError';

// Exports
export default class MisdirectedRequest extends HttpError {
  /**
   * @override
   */
  public static statusCode = 421;
  public static title = 'Misdirected Request';
}

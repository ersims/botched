import HttpError from '../HttpError';

// Exports
export default class LengthRequired extends HttpError {
  /**
   * @override
   */
  public static statusCode = 411;
  public static title = 'Length Required';
}

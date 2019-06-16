import HttpError from '../HttpError';

// Exports
export default class Gone extends HttpError {
  /**
   * @override
   */
  public static statusCode = 410;
  public static title = 'Gone';
}

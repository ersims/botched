import HttpError from '../HttpError';

// Exports
export default class ImATeapot extends HttpError {
  /**
   * @override
   */
  public static statusCode = 418;
  public static title = "I'm a Teapot";
}

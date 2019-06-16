import HttpError from '../HttpError';

// Exports
export default class UpgradeRequired extends HttpError {
  /**
   * @override
   */
  public static statusCode = 426;
  public static title = 'Upgrade Required';
}

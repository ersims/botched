import HttpError from '../HttpError';

// Exports
export default class FailedDependency extends HttpError {
  /**
   * @override
   */
  public static statusCode = 424;
  public static title = 'Failed Dependency';
}

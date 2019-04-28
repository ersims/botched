// Imports
import HttpError from '../HttpError';

// Exports
export default class BandwidthLimitExceeded extends HttpError {
  /**
   * @override
   */
  public static statusCode = 509;
  public static title = 'Bandwidth Limit Exceeded';
}

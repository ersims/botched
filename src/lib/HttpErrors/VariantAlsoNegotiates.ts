// Imports
import HttpError from '../HttpError';

// Exports
export default class VariantAlsoNegotiates extends HttpError {
  /**
   * @override
   */
  public static statusCode = 506;
  public static title = 'Variant Also Negotiates';
}

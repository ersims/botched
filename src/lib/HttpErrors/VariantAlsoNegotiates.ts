import BotchedError from '../BotchedError';

// Exports
export class VariantAlsoNegotiates extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 506;
  public static title = 'Variant Also Negotiates';
}

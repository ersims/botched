import BotchedError from '../BotchedError';

// Exports
export class VariantAlsoNegotiates extends BotchedError {
  /**
   * @override
   */
  public static status = 506;
  public static title = 'Variant Also Negotiates';
}

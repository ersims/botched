import { VError } from 'verror';
import { Link, Meta } from './BotchedError';
import botch, { MaybeDetailedError } from './botch';

// Types
export interface JSONAPIError {
  id?: string;
  code?: string;
  status: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  links?: { about: Link };
  meta?: Meta;
}

/**
 * Serialize the error object to a JSON:API representation
 *
 * @param {Error} err
 * @returns {JSONAPIError}
 */
function serializeJSONAPIError(err: MaybeDetailedError): JSONAPIError {
  const botchedError = botch(err);

  return {
    id: botchedError.id,
    code: botchedError.code,
    status: botchedError.status.toString(),
    title: botchedError.title,
    detail: botchedError.detail,
    source: botchedError.source,
    links: botchedError.links,
    meta: botchedError.meta,
  };
}

// Exports
export default serializeJSONAPIError;

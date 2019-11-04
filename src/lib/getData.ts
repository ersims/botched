import { VError } from 'verror';
import { MaybeDetailedError } from './botch';

/**
 * Extract error data
 *
 * @param {MaybeDetailedError} err
 * @returns {{headers: {[p: string]: string} | Headers | string | string[][] | Record<string, string> | undefined | any | IncomingHttpHeaders | OutgoingHttpHeaders; code: any; meta: Object | any | Identifier | undefined | Meta | boolean | HTMLMetaElement; links: {about: Link} | HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement> | any | undefined; id: any; source: any; title: any}}
 */
function getData(err: MaybeDetailedError) {
  const data = (typeof err.data === 'object' && err.data) || VError.info(err);
  return {
    headers: err.headers || data.headers,
    id: err.id || data.id,
    code: err.code || data.code,
    title: err.title || data.title,
    source: err.source || data.source,
    links: err.links || data.links,
    meta: err.meta || data.meta,
  };
}

// Exports
export { getData };

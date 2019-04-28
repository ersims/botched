// Imports
import BadRequest from './BadRequest';
import Unauthorized from './Unauthorized';
import PaymentRequired from './PaymentRequired';
import Forbidden from './Forbidden';
import NotFound from './NotFound';
import MethodNotAllowed from './MethodNotAllowed';
import NotAcceptable from './NotAcceptable';
import ProxyAuthenticationRequired from './ProxyAuthenticationRequired';
import RequestTimeout from './RequestTimeout';
import Conflict from './Conflict';
import Gone from './Gone';
import LengthRequired from './LengthRequired';
import PreconditionFailed from './PreconditionFailed';
import PayloadTooLarge from './PayloadTooLarge';
import URITooLong from './URITooLong';
import UnsupportedMediaType from './UnsupportedMediaType';
import RangeNotSatisfiable from './RangeNotSatisfiable';
import ExpectationFailed from './ExpectationFailed';
import ImATeapot from './ImATeapot';
import MisdirectedRequest from './MisdirectedRequest';
import UnprocessableEntity from './UnprocessableEntity';
import Locked from './Locked';
import FailedDependency from './FailedDependency';
import TooEarly from './TooEarly';
import UpgradeRequired from './UpgradeRequired';
import PreconditionRequired from './PreconditionRequired';
import TooManyRequests from './TooManyRequests';
import RequestHeaderFieldsTooLarge from './RequestHeaderFieldsTooLarge';
import UnavailableForLegalReasons from './UnavailableForLegalReasons';
import InternalServerError from './InternalServerError';
import NotImplemented from './NotImplemented';
import BadGateway from './BadGateway';
import ServiceUnavailable from './ServiceUnavailable';
import GatewayTimeout from './GatewayTimeout';
import HTTPVersionNotSupported from './HTTPVersionNotSupported';
import VariantAlsoNegotiates from './VariantAlsoNegotiates';
import InsufficientStorage from './InsufficientStorage';
import LoopDetected from './LoopDetected';
import BandwidthLimitExceeded from './BandwidthLimitExceeded';
import NotExtended from './NotExtended';
import NetworkAuthenticationRequired from './NetworkAuthenticationRequired';

// Exports
export {
  BadRequest,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  ProxyAuthenticationRequired,
  RequestTimeout,
  Conflict,
  Gone,
  LengthRequired,
  PreconditionFailed,
  PayloadTooLarge,
  URITooLong,
  UnsupportedMediaType,
  RangeNotSatisfiable,
  ExpectationFailed,
  ImATeapot,
  MisdirectedRequest,
  UnprocessableEntity,
  Locked,
  FailedDependency,
  TooEarly,
  UpgradeRequired,
  PreconditionRequired,
  TooManyRequests,
  RequestHeaderFieldsTooLarge,
  UnavailableForLegalReasons,
  InternalServerError,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
  HTTPVersionNotSupported,
  VariantAlsoNegotiates,
  InsufficientStorage,
  LoopDetected,
  BandwidthLimitExceeded,
  NotExtended,
  NetworkAuthenticationRequired,
};
export const httpErrorCodes = {
  400: BadRequest,
  401: Unauthorized,
  402: PaymentRequired,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  407: ProxyAuthenticationRequired,
  408: RequestTimeout,
  409: Conflict,
  410: Gone,
  411: LengthRequired,
  412: PreconditionFailed,
  413: PayloadTooLarge,
  414: URITooLong,
  415: UnsupportedMediaType,
  416: RangeNotSatisfiable,
  417: ExpectationFailed,
  418: ImATeapot,
  421: MisdirectedRequest,
  422: UnprocessableEntity,
  423: Locked,
  424: FailedDependency,
  425: TooEarly,
  426: UpgradeRequired,
  428: PreconditionRequired,
  429: TooManyRequests,
  431: RequestHeaderFieldsTooLarge,
  451: UnavailableForLegalReasons,
  500: InternalServerError,
  501: NotImplemented,
  502: BadGateway,
  503: ServiceUnavailable,
  504: GatewayTimeout,
  505: HTTPVersionNotSupported,
  506: VariantAlsoNegotiates,
  507: InsufficientStorage,
  508: LoopDetected,
  509: BandwidthLimitExceeded,
  510: NotExtended,
  511: NetworkAuthenticationRequired,
};

import BaseError, { WError } from 'verror';
import uuidv4 from 'uuid/v4';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

// Types
export type Link = string | { href: string; meta?: Meta };
export interface Source {
  pointer?: string;
  parameter?: string;
}
export interface Meta {
  [key: string]: any;
}
export interface ErrorOptions extends BaseError.Options {
  id?: BotchedError['id'];
  code?: BotchedError['code'];
  title?: BotchedError['title'];
  source?: BotchedError['source'];
  links?: BotchedError['links'];
  meta?: BotchedError['meta'];
  statusCode?: BotchedError['statusCode'];
  headers?: BotchedError['headers'];
}

// Exports
export default class BotchedError extends WError {
  // The botched library version
  public static readonly version: string = version;

  /**
   * Default values for class instances
   */
  public static id: BotchedError['id'];
  public static code: BotchedError['code'];
  public static title: BotchedError['title'] = 'Internal Server Error';
  public static source: BotchedError['source'];
  public static links: BotchedError['links'];
  public static meta: BotchedError['meta'];
  public static statusCode: BotchedError['statusCode'] = 500;
  public static headers: BotchedError['headers'] = {};

  /**
   * Parse options from VError args
   *
   * @param {any[]} args
   * @returns {object}
   */
  public static getOptionsFromArgs(args: any[]): Record<string, unknown> {
    return (args && args[0] && typeof args[0] === 'object' && args[0]) || {};
  }

  /**
   * Unique identifier for this error instance
   * Useful for correlating errors in logs
   *
   * Do not put any sensitive information here!
   */
  public id: string = (this.constructor as typeof BotchedError).id;

  /**
   * Application specific error codes
   *
   * Do not put any sensitive information here!
   */
  public code: string = (this.constructor as typeof BotchedError).code || this.constructor.name;

  /**
   * A short human-readable title for this type of error
   *
   * Do not put any sensitive information here!
   */
  public title: string = (this.constructor as typeof BotchedError).title;

  /**
   * An object explaining the source of the error to the user - useful for validation errors
   *
   * Do not put any sensitive information here!
   */
  public source: Source = (this.constructor as typeof BotchedError).source;

  /**
   * An object with links to some documentation where a user might get more information about this error
   *
   * Do not put any sensitive information here!
   */
  public links: { about: Link } = (this.constructor as typeof BotchedError).links;

  /**
   * An object with any other non-standard information about the error
   *
   * Do not put any sensitive information here!
   */
  public meta: object = (this.constructor as typeof BotchedError).meta;

  /**
   * Convenience bool to check for this type of error
   */
  public readonly isBotched: boolean = true;

  /**
   * Error details (from Error message)
   */
  public get detail(): string | undefined {
    return this.message !== '' ? this.message : undefined;
  }

  /**
   * HTTP Status code for this type of error
   *
   * Do not put any sensitive information here!
   */
  public statusCode: number = (this.constructor as typeof BotchedError).statusCode;

  /**
   * HTTP Headers to send
   *
   * Do not put any sensitive information here!
   */
  public headers: { [key: string]: string } = (this.constructor as typeof BotchedError).headers;

  /**
   * HTTP Status code as string
   */
  public get status(): string {
    return this.statusCode.toString();
  }

  /**
   * Botched error version
   */
  public get version(): string {
    return (this.constructor as typeof BotchedError).version;
  }

  /**
   * Is this a server error?
   */
  public readonly isServer!: boolean;

  /**
   * Thin layer on top of "verror"
   * @see https://github.com/joyent/node-verror
   */
  public constructor(message?: string, ...params: any[]);
  public constructor(options?: ErrorOptions | Error, message?: string, ...params: any[]);
  public constructor(...args: any[]) {
    super(...args);

    // Set error name
    this.name = this.constructor.name;

    // Extract options
    const opts = BotchedError.getOptionsFromArgs(args);

    // Assign data
    Object.assign(this, {
      id: opts.id || this.id || uuidv4(),
      code: opts.code || this.code,
      title: opts.title || this.title,
      source: opts.source || this.source,
      links: opts.links || this.links,
      meta: opts.meta || this.meta,
      statusCode: opts.statusCode || this.statusCode,
      headers: opts.headers || this.headers,
    });

    // Make isServer enumerable
    Object.defineProperty(this, 'isServer', {
      enumerable: true,
      get() {
        return this.statusCode >= 500;
      },
    });
  }

  /**
   * Create a JSON friendly representation of this error
   * Defaults to the JSON:API spec
   *
   * @return {object}
   */
  public toJSON(): object {
    return {
      id: this.id,
      code: this.code,
      status: this.status,
      title: this.title,
      detail: this.detail,
      source: this.source,
      links: this.links,
      meta: this.meta,
    };
  }
}

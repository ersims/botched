// Imports
import BaseError, { WError } from 'verror';
import uuidv4 from 'uuid/v4';

// Types
export type Link = string | { href: string; meta?: Meta };
export interface Source {
  pointer?: string;
  parameter?: string;
}
export interface Meta {
  [key: string]: any;
}
export interface GenericErrorOptions extends BaseError.Options {
  id?: GenericError['id'];
  code?: GenericError['code'];
  title?: GenericError['title'];
  source?: GenericError['source'];
  links?: GenericError['links'];
  meta?: GenericError['meta'];
}

// Exports
export default class GenericError extends WError {
  /**
   * Default values for class instances
   */
  public static id: GenericError['id'];
  public static code: GenericError['code'];
  public static title: GenericError['title'] = 'Internal Server Error';
  public static source: GenericError['source'];
  public static links: GenericError['links'];
  public static meta: GenericError['meta'];

  /**
   * Parse options from VError args
   *
   * @param {any[]} args
   * @returns {object}
   */
  public static getOptionsFromArgs(args: any[]) {
    return (args && args[0] && typeof args[0] === 'object' && args[0]) || {};
  }

  /**
   * Unique identifier for this error instance
   * Useful for correlating errors in logs
   *
   * Do not put any sensitive information here!
   */
  public id: string = (this.constructor as typeof GenericError).id;

  /**
   * Application specific error codes
   *
   * Do not put any sensitive information here!
   */
  public code: string = (this.constructor as typeof GenericError).code || this.constructor.name;

  /**
   * A short human-readable title for this type of error
   *
   * Do not put any sensitive information here!
   */
  public title: string = (this.constructor as typeof GenericError).title;

  /**
   * An object explaining the source of the error to the user - useful for validation errors
   *
   * Do not put any sensitive information here!
   */
  public source: Source = (this.constructor as typeof GenericError).source;

  /**
   * An object with links to some documentation where a user might get more information about this error
   *
   * Do not put any sensitive information here!
   */
  public links: { about: Link } = (this.constructor as typeof GenericError).links;

  /**
   * An object with any other non-standard information about the error
   *
   * Do not put any sensitive information here!
   */
  public meta: object = (this.constructor as typeof GenericError).meta;

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
   * Thin layer on top of "verror"
   * @see https://github.com/joyent/node-verror
   */
  public constructor(message?: string, ...params: any[]);
  // eslint-disable-next-line no-dupe-class-members
  public constructor(options?: GenericErrorOptions | Error, message?: string, ...params: any[]);
  // eslint-disable-next-line no-dupe-class-members
  public constructor(...args: any[]) {
    super(...args);

    // Set error name
    this.name = this.constructor.name;

    // Extract options
    const opts = GenericError.getOptionsFromArgs(args);
    const cause: Partial<GenericError> = this.cause() || {};

    // Assign data
    Object.assign(this, {
      id: opts.id || cause.id || this.id || uuidv4(),
      code: opts.code || cause.code || this.code,
      title: opts.title || cause.title || this.title,
      source: opts.source || cause.source || this.source,
      links: opts.links || cause.links || this.links,
      meta: opts.meta || cause.meta || this.meta,
    });
  }

  /**
   * Create a JSON friendly representation of this error
   *
   * @return {object}
   */
  public toJSON(): object {
    return {
      id: this.id,
      code: this.code,
      title: this.title,
      detail: this.detail,
      source: this.source,
      links: this.links,
      meta: this.meta,
    };
  }
}

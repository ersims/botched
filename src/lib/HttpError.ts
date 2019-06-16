import GenericError, { GenericErrorOptions } from './GenericError';

// Types
export interface HttpErrorOptions extends GenericErrorOptions {
  statusCode?: HttpError['statusCode'];
  headers?: HttpError['headers'];
}

// Exports
export default class HttpError extends GenericError {
  /**
   * Default values for class instances
   */
  public static statusCode: HttpError['statusCode'] = 500;
  public static headers: HttpError['headers'] = {};
  public static title = 'Internal Server Error';

  /**
   * HTTP Status code for this type of error
   *
   * Do not put any sensitive information here!
   */
  public statusCode: number = (this.constructor as typeof HttpError).statusCode;

  /**
   * HTTP Headers to send
   *
   * Do not put any sensitive information here!
   */
  public headers: { [key: string]: string } = (this.constructor as typeof HttpError).headers;

  /**
   * HTTP Status code in string format
   */
  public get status() {
    return this.statusCode.toString();
  }

  /**
   * Is this a server error?
   */
  public readonly isServer!: boolean;

  /**
   * Thin layer on top of "verror" adapted for http friendly errors
   * @see https://github.com/joyent/node-verror
   */
  public constructor(message?: string, ...params: any[]);
  public constructor(options?: HttpErrorOptions | Error, message?: string, ...params: any[]);
  public constructor(...args: any[]) {
    super(...args);

    // Extract options (and inherited values)
    const opts = GenericError.getOptionsFromArgs(args);

    // Assign data
    Object.assign(this, {
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

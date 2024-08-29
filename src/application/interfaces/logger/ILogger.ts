/**
 *
 */
/* prettier-ignore */
export interface ILogger {
    trace(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    debug(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    info(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    warn(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    error(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    critical(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    fatal(messageOrError: string | Error | unknown, contextOrPayload?: string | object, payload?: object): void;
    setContext(context: string): void;
}

export const ILogger = Symbol('ILogger');

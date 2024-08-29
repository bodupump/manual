import { EStatus } from './EStatus';

/**
 *
 */
export class Exception extends Error {
    readonly message: string;
    readonly context?: string;
    readonly payload?: object;
    readonly stack?: string;
    readonly status: number = EStatus.INTERNAL_SERVER_ERROR;

    /**
     *
     */
    constructor(messageOrError: string | Error | unknown);
    constructor(messageOrError: string | Error | unknown, context: string);
    constructor(messageOrError: string | Error | unknown, payload: object);
    constructor(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    );
    constructor(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        _payload?: object,
    ) {
        let message;
        let stack;
        if (messageOrError instanceof Error) {
            const error = messageOrError;
            message = error.message;
            stack = error.stack;
        } else {
            message = `${messageOrError}`;
        }

        let context;
        let payload;
        if (typeof contextOrPayload === 'string') {
            context = contextOrPayload;
            payload = _payload;
        } else if (typeof contextOrPayload === 'object') {
            payload = contextOrPayload;
        }

        super(message);
        this.message = message;
        this.context = context;
        this.payload = payload;
        this.stack = stack;
    }
}

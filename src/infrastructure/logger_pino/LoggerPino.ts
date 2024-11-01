import { ELoggerLevel } from '../../application/interfaces/logger/ELoggerLevel';
import { Exception } from '../../application/exceptions/Exception';
import { ILogger } from '../../application/interfaces/logger/ILogger';
import { loggerConfig } from '../../config/loggerConfig';
import { pino } from 'pino';

const pinoLevelNumbers = {
    [ELoggerLevel.TRACE]: 10,
    [ELoggerLevel.DEBUG]: 20,
    [ELoggerLevel.INFO]: 30,
    [ELoggerLevel.WARN]: 40,
    [ELoggerLevel.ERROR]: 50,
    [ELoggerLevel.CRITICAL]: 55,
    [ELoggerLevel.FATAL]: 60,
};

/**
 * https://github.com/jorgebucaran/colorette
 */
const pinoLevelPrettyColors = {
    [ELoggerLevel.TRACE]: 'cyan',
    [ELoggerLevel.DEBUG]: 'blue',
    [ELoggerLevel.INFO]: 'greenBright',
    [ELoggerLevel.WARN]: 'yellowBright',
    [ELoggerLevel.ERROR]: 'redBright',
    [ELoggerLevel.CRITICAL]: 'bgRed',
    [ELoggerLevel.FATAL]: 'bgMagenta',
};

/**
 *
 */
export class LoggerPino implements ILogger {
    private context: string | undefined;
    private readonly pinoLogger: pino.Logger;

    /**
     *
     */
    constructor(options: pino.LoggerOptions = {}) {
        this.pinoLogger = pino({
            name: loggerConfig.name,
            level: loggerConfig.level ?? ELoggerLevel.ERROR,
            formatters: {
                level: (label) => {
                    return { level: label.toUpperCase() };
                },
            },
            timestamp: () => `,"time":"${new Date().toISOString()}"`,
            ...(loggerConfig.isPrettify
                ? {
                      transport: {
                          target: 'pino-pretty',
                          options: {
                              customLevels: optsToStr(pinoLevelNumbers),
                              customColors: optsToStr(pinoLevelPrettyColors),
                          },
                      },
                  }
                : {}),
            customLevels: {
                [ELoggerLevel.CRITICAL]:
                    pinoLevelNumbers[ELoggerLevel.CRITICAL],
            },
            ...options,
        });

        function optsToStr(opts: Record<string, string | number>) {
            return Object.entries(opts)
                .map((entry) => entry.join(':'))
                .join(',');
        }
    }

    /**
     *
     */
    setContext(context: string): void {
        this.context = `${context}`;
    }

    /**
     *
     */
    private log(
        pinoLevel: ELoggerLevel,
        messageOrError: string | Error | unknown,
        contextOrPayload: string | object | undefined,
        _payload: object | undefined,
    ): void {
        if (!this.pinoLogger.isLevelEnabled(pinoLevel)) return;

        let message;
        let stack;
        if (messageOrError instanceof Exception) {
            message = messageOrError.message;
            stack = messageOrError.stack?.split(/\s{2,}/);
        } else if (messageOrError instanceof Error) {
            const error = messageOrError;
            message = error.message;
            stack = error.stack?.split(/\s{2,}/);
        } else {
            message = `${messageOrError}`;
        }

        let context = '';
        let payload;
        if (messageOrError instanceof Exception) {
            payload = messageOrError.payload;
        } else if (typeof contextOrPayload === 'string') {
            context = contextOrPayload;
            payload = _payload;
        } else if (typeof contextOrPayload === 'object') {
            payload = contextOrPayload;
        }

        let totalContext;
        if (messageOrError instanceof Exception) {
            totalContext = messageOrError.context;
        } else if (this.context && context) {
            totalContext = `${this.context}.${context}`;
        } else if (this.context) {
            totalContext = this.context;
        } else if (context) {
            totalContext = `${context}`;
        }

        const mergingObject = {
            ...(totalContext !== undefined ? { context: totalContext } : {}),
            ...(stack !== undefined ? { stack } : {}),
            ...(payload !== undefined ? { payload } : {}),
        };
        (this.pinoLogger as any)[pinoLevel](mergingObject, message);
    }

    /**
     *
     */
    trace(messageOrError: string | Error | unknown): void;
    trace(messageOrError: string | Error | unknown, context: string): void;
    trace(messageOrError: string | Error | unknown, payload: object): void;
    trace(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    trace(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(ELoggerLevel.TRACE, messageOrError, contextOrPayload, payload);
    }

    /**
     *
     */
    debug(messageOrError: string | Error | unknown): void;
    debug(messageOrError: string | Error | unknown, context: string): void;
    debug(messageOrError: string | Error | unknown, payload: object): void;
    debug(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    debug(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(ELoggerLevel.DEBUG, messageOrError, contextOrPayload, payload);
    }

    /**
     *
     */
    info(messageOrError: string | Error | unknown): void;
    info(messageOrError: string | Error | unknown, context: string): void;
    info(messageOrError: string | Error | unknown, payload: object): void;
    info(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    info(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(ELoggerLevel.INFO, messageOrError, contextOrPayload, payload);
    }

    /**
     *
     */
    warn(messageOrError: string | Error | unknown): void;
    warn(messageOrError: string | Error | unknown, context: string): void;
    warn(messageOrError: string | Error | unknown, payload: object): void;
    warn(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    warn(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(ELoggerLevel.WARN, messageOrError, contextOrPayload, payload);
    }

    /**
     *
     */
    error(messageOrError: string | Error | unknown): void;
    error(messageOrError: string | Error | unknown, context: string): void;
    error(messageOrError: string | Error | unknown, payload: object): void;
    error(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    error(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(ELoggerLevel.ERROR, messageOrError, contextOrPayload, payload);
    }

    /**
     *
     */
    critical(messageOrError: string | Error | unknown): void;
    critical(messageOrError: string | Error | unknown, context: string): void;
    critical(messageOrError: string | Error | unknown, payload: object): void;
    critical(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    critical(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(
            ELoggerLevel.CRITICAL,
            messageOrError,
            contextOrPayload,
            payload,
        );
    }

    /**
     *
     */
    fatal(messageOrError: string | Error | unknown): void;
    fatal(messageOrError: string | Error | unknown, context: string): void;
    fatal(messageOrError: string | Error | unknown, payload: object): void;
    fatal(
        messageOrError: string | Error | unknown,
        context: string,
        payload: object,
    ): void;
    fatal(
        messageOrError: string | Error | unknown,
        contextOrPayload?: string | object,
        payload?: object,
    ): void {
        this.log(ELoggerLevel.FATAL, messageOrError, contextOrPayload, payload);
    }
}

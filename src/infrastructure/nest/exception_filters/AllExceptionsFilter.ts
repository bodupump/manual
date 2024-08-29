import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Exception } from '../../../application/exceptions/Exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        let message = 'Internal server error';
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception.details) {
            message = exception.details;
        }

        let error;
        try {
            const match = exception.details.match(/^{.*}$/);
            if (match) {
                const strError = match[0];
                error = strError && JSON.parse(strError);
                /*if (error.status) {
                    httpStatus = error.status;
                }*/
            }
        } catch {}

        if (exception instanceof Exception) {
            error = exception;
        }

        const responseBody = {
            statusCode: httpStatus,
            message,
            ...error,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { LoggerPino } from '../../logger_pino/LoggerPino';
import { EGrpcStatusCode } from '../../grpc/EGrpcStatusCode';
import { Exception } from '../../../application/exceptions/Exception';

@Catch(Error)
export class GrpcExceptionFilter implements RpcExceptionFilter<Error> {
    catch(e: Error /*, host: ArgumentsHost*/): Observable<any> {
        const logger: ILogger = new LoggerPino();
        logger.error(e, 'GrpcExceptionFilter.catch', {
            e,
        });

        let message;
        let code = EGrpcStatusCode.UNKNOWN;
        if (e instanceof Exception) {
            code = e.status;
            message = JSON.stringify(e);
        } else {
            const strCause = e.cause ? ` :: ${JSON.stringify(e.cause)}` : '';
            message = `${e.message}${strCause}`;
        }

        return throwError(
            () =>
                new RpcException({
                    code,
                    message,
                }),
        );
    }
}

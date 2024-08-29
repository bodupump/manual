import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class LoggingGrpcInterceptor implements NestInterceptor {
    constructor(@Inject(ILogger) private readonly logger: ILogger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log('context', context);
        const request = context.getArgByIndex(0);
        const metadata: Metadata = context.getArgByIndex(1);
        const serverWritableStreamImpl = context.getArgByIndex(2);
        const path = serverWritableStreamImpl?.path;
        this.logger.trace('grpc', path, {
            request,
            metadata,
        });

        return next.handle();
    }
}

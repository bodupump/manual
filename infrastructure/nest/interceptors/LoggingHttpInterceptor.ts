import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ILogger } from '@app/interfaces/logger/ILogger';

@Injectable()
export class LoggingHttpInterceptor implements NestInterceptor {
    constructor(@Inject(ILogger) private readonly logger: ILogger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log('context', context);
        const request = context.switchToHttp().getRequest();
        this.logger.trace('http', request.url, {
            method: request.method,
            params: request.params,
            query: request.query,
        });

        return next.handle();
    }
}

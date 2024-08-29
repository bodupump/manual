import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { LoggerPino } from '../../logger_pino/LoggerPino';
import { Global, Module, Scope } from '@nestjs/common';

@Global()
@Module({
    providers: [
        {
            provide: ILogger,
            useFactory: (): ILogger => {
                return new LoggerPino();
            },
            scope: Scope.TRANSIENT,
        },
    ],
    exports: [ILogger],
})
export class LoggerModule {}

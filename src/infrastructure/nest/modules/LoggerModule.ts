import { ILogger } from '@app/interfaces/logger/ILogger';
import { LoggerPino } from '@infrastructure/logger_pino/LoggerPino';
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

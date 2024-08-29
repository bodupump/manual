import { Module } from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { LoggerModule } from './LoggerModule';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AsyncLocalStorageModule } from './AsyncLocalStorageModule';
import { IFooRepository } from '../../../application/interfaces/repository/IFooRepository';
import { IBarRepository } from '../../../application/interfaces/repository/IBarRepository';
import { BarRepository } from '../../localStorage/repository/BarRepository';
import { FooRepository } from '../../localStorage/repository/FooRepository';

@Module({
    imports: [LoggerModule, AsyncLocalStorageModule],
    providers: [
        {
            provide: IBarRepository,
            useFactory: (
                logger: ILogger,
                asyncLocalStorage: AsyncLocalStorage<any>,
            ): IBarRepository =>
                new BarRepository(logger, asyncLocalStorage),
            inject: [ILogger, AsyncLocalStorage],
        },
        {
            provide: IFooRepository,
            useFactory: (
                logger: ILogger,
                asyncLocalStorage: AsyncLocalStorage<any>,
            ): IFooRepository =>
                new FooRepository(logger, asyncLocalStorage),
            inject: [ILogger, AsyncLocalStorage],
        },
    ],
    exports: [
        IBarRepository,
        IFooRepository,
    ],
})
export class RepositoriesModule {}

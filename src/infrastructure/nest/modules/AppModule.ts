import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { NoteService } from '../../../application/services/NoteService';
import { HealthCheckController } from '../controllers/HealthCheckController';
import { GrpcConnectionModule } from './GrpcConnectionModule';
import { AsyncLocalStorageModule } from './AsyncLocalStorageModule';
import { LoggerModule } from './LoggerModule';
import { ModeratorMiddleware } from '../middlewares/ModeratorMiddleware';
import { FooController } from '../controllers/FooController';
import { IFooRepository } from '../../../application/interfaces/repository/IFooRepository';
import { IBarRepository } from '../../../application/interfaces/repository/IBarRepository';
import { BarController } from '../controllers/BarController';
import { RepositoriesModule } from './RepositoriesModule';
import { RpcHttpController } from '../controllers/RpcHttpController';
import { RpcClientModule } from './RpcClientModule';

@Module({
    imports: [
        LoggerModule,
        GrpcConnectionModule,
        AsyncLocalStorageModule,
        RepositoriesModule,
        RpcClientModule,
    ],
    controllers: [HealthCheckController, FooController, BarController, RpcHttpController],
    providers: [
        {
            provide: NoteService,
            useFactory: (
                fooRepository: IFooRepository,
                barRepository: IBarRepository,
            ) => {
                return new NoteService(fooRepository, barRepository);
            },
            inject: [IFooRepository, IBarRepository],
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /*consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: '/manual/health', method: RequestMethod.GET },
            )
            .forRoutes({ path: 'api/!*', method: RequestMethod.ALL });*/

        consumer
            .apply(ModeratorMiddleware)
            .forRoutes({ path: '/api/admin/box', method: RequestMethod.GET });
    }
}

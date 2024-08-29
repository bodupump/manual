import { Module } from '@nestjs/common';
import { join } from 'node:path';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { IFooService } from '../../../application/interfaces/services/microservice_01/IFooService';
import { IBarService } from '../../../application/interfaces/services/microservice_01/IBarService';
import { config } from '../../../config/config';

const GRPC_URL_MICROSERVICE_01 = config.grpc.microservice_01.url;

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'GRPC_MICROSERVICE_01_CLIENT',
                transport: Transport.GRPC,
                options: {
                    url: GRPC_URL_MICROSERVICE_01,
                    package: ['Microservice01Package'],
                    protoPath: [
                        join(
                            __dirname,
                            '../../grpc/microservice_01/FooService.proto',
                        ),
                        join(
                            __dirname,
                            '../../grpc/microservice_01/BarService.proto',
                        ),
                    ],
                    loader: {
                        keepCase: true,
                        includeDirs: [
                            join(__dirname, '../../grpc/microservice_01'),
                        ],
                    },
                },
            },
        ]),
    ],
    providers: [
        {
            provide: IFooService,
            useFactory: (client: ClientGrpc): IFooService => {
                return client.getService<IFooService>('FooService');
            },
            inject: ['GRPC_MICROSERVICE_01_CLIENT'],
        },
        {
            provide: IBarService,
            useFactory: (client: ClientGrpc): IBarService => {
                return client.getService<IBarService>('BarService');
            },
            inject: ['GRPC_MICROSERVICE_01_CLIENT'],
        },
    ],
    exports: [
        IFooService,
        IBarService,
    ],
})
export class GrpcConnectionModule {}

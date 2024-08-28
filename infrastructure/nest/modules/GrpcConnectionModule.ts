import { Module } from '@nestjs/common';
import { join } from 'node:path';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { config } from '@config/config';
import { IGearService } from '@app/interfaces/services/training_journal/IGearService';
import { IMuscleService } from '@app/interfaces/services/training_journal/IMuscleService';
import { IExerciseService } from '@app/interfaces/services/training_journal/IExerciseService';
import { IExerciseSetService } from '@app/interfaces/services/training_journal/IExerciseSetService';

const GRPC_URL_TRAINING_JOURNAL = config.grpc.training_journal.url;
// const GRPC_URL_FOOD_JOURNAL = config.grpc.food_journal.url;

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'GRPC_TRAINING_JOURNAL_CLIENT',
                transport: Transport.GRPC,
                options: {
                    url: GRPC_URL_TRAINING_JOURNAL,
                    package: ['TrainingJournalPackage'],
                    protoPath: [
                        join(
                            __dirname,
                            '../../grpc/training_journal/GearService.proto',
                        ),
                        join(
                            __dirname,
                            '../../grpc/training_journal/MuscleService.proto',
                        ),
                        join(
                            __dirname,
                            '../../grpc/training_journal/ExerciseService.proto',
                        ),
                        join(
                            __dirname,
                            '../../grpc/training_journal/ExerciseSetService.proto',
                        ),
                    ],
                    loader: {
                        keepCase: true,
                        includeDirs: [
                            join(__dirname, '../../grpc/training_journal'),
                        ],
                    },
                },
            },
        ]),
    ],
    providers: [
        {
            provide: IGearService,
            useFactory: (client: ClientGrpc): IGearService => {
                return client.getService<IGearService>('GearService');
            },
            inject: ['GRPC_TRAINING_JOURNAL_CLIENT'],
        },
        {
            provide: IMuscleService,
            useFactory: (client: ClientGrpc): IMuscleService => {
                return client.getService<IMuscleService>('MuscleService');
            },
            inject: ['GRPC_TRAINING_JOURNAL_CLIENT'],
        },
        {
            provide: IExerciseService,
            useFactory: (client: ClientGrpc): IExerciseService => {
                return client.getService<IExerciseService>('ExerciseService');
            },
            inject: ['GRPC_TRAINING_JOURNAL_CLIENT'],
        },
        {
            provide: IExerciseSetService,
            useFactory: (client: ClientGrpc): IExerciseSetService => {
                return client.getService<IExerciseSetService>(
                    'ExerciseSetService',
                );
            },
            inject: ['GRPC_TRAINING_JOURNAL_CLIENT'],
        },
    ],
    exports: [
        IGearService,
        IMuscleService,
        IExerciseService,
        IExerciseSetService,
    ],
})
export class GrpcConnectionModule {}

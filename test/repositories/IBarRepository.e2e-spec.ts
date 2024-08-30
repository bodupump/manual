import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { RepositoriesModule } from '../../src/infrastructure/nest/modules/RepositoriesModule';
import { LoggerModule } from '../../src/infrastructure/nest/modules/LoggerModule';
import { ILogger } from '../../src/application/interfaces/logger/ILogger';
import { sleep } from '../../src/utils/sleep';
import { IBarRepository } from '../../src/application/interfaces/repository/IBarRepository';
import { CreateBarDto } from '../../src/domain/Bar';
import { BarTarget } from '../../src/application/targets/Bar';

const mockAsyncLocalStorage = {
    getStore: () => {
        return {
            get: (arg: string) => {
                console.log('mockAsyncLocalStorage');
                switch (arg) {
                    case 'langId':
                        return 'ru';
                }
            },
        };
    },
};

const createBarDtos: CreateBarDto[] = [
    {
        id: 'aaa0262f-9476-46c5-8337-ba540f55d201',
        name: 'Наименование 01',
    },
    {
        id: 'aaa0262f-9476-46c5-8337-ba540f55d202',
        name: 'Наименование 02',
    },
    {
        id: 'aaa0262f-9476-46c5-8337-ba540f55d203',
        name: 'Наименование 03',
    },
    {
        id: 'aaa0262f-9476-46c5-8337-ba540f55d204',
        name: 'Наименование 04',
    },
];

describe('IBarRepository', () => {
    let module: TestingModule;
    let barRepository: IBarRepository;
    let logger: ILogger;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [RepositoriesModule, LoggerModule],
        }).compile();
        barRepository = await module.resolve<IBarRepository>(IBarRepository);
        (barRepository as any)['asyncLocalStorage'] = mockAsyncLocalStorage;
        logger = await module.resolve<ILogger>(ILogger);

        await Promise.all(
            createBarDtos.map((createBarDto) =>
                barRepository.create(createBarDto),
            ),
        );
    });

    afterAll(async () => {
        await sleep(500);
        await module.close();
    });

    describe('get', () => {
        it('01', async () => {
            const id = 'aaa0262f-9476-46c5-8337-ba540f55d203';
            try {
                const res = await barRepository.getOne({
                    target: BarTarget.id,
                    value: id,
                });
                console.log(res);
            } catch (e) {
                logger.error(e, { e });
                throw e;
            }
        });
    });

    describe('find all', () => {
        it('01', async () => {
            try {
                const res = await barRepository.getMany();
                console.log(res);
            } catch (e) {
                logger.error(e, { e });
                throw e;
            }
        });
    });
});

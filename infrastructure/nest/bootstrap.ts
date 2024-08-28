import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { config } from '../../config/config';
import { LoggerPino } from '../logger_pino/LoggerPino';
import { ILogger } from '../../application/interfaces/logger/ILogger';
import { ELoggerLevel } from '../../application/interfaces/logger/ELoggerLevel';
import { AllExceptionsFilter } from './exception_filters/AllExceptionsFilter';
import { LoggingHttpInterceptor } from './interceptors/LoggingHttpInterceptor';
import { INestApplication, RequestMethod } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { ReflectionService } from '@grpc/reflection';

const logger: ILogger = new LoggerPino({
    level: ELoggerLevel.TRACE,
});
logger.setContext('bootstrap');

const GRPC_URL = config.grpc.self.url;
const HTTP_PORT = config.app.port;
const TIMEOUT_SIGTERM_MS = 30 * 1000;
const CAPTURE_SHUTDOWN_SIGNALS = [
    'SIGTERM',
    // 'SIGINT',
];

/**
 *
 */
export async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    for (const sig of CAPTURE_SHUTDOWN_SIGNALS) {
        process.once(sig, async () => {
            await closeApp(app, sig);
        });
    }
    logger.trace(
        `Перехватываем ${CAPTURE_SHUTDOWN_SIGNALS.join(', ')} process.once`,
    );

    app.setGlobalPrefix('api', {
        exclude: [{ path: 'manual/health', method: RequestMethod.GET }],
    });

    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

    app.useGlobalInterceptors(new LoggingHttpInterceptor(logger));

    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            url: GRPC_URL,
            package: 'TrainingJournalPackage',
            protoPath: [
                join(
                    __dirname,
                    '../../infrastructure/grpc/self/FooService.proto',
                ),
            ],
            loader: {
                keepCase: true,
                includeDirs: [
                    join(__dirname, '../../infrastructure/grpc/self'),
                ],
            },
            onLoadPackageDefinition: (pkg: any, server: any): void => {
                new ReflectionService(pkg).addToServer(server);
            },
        },
    });
    await app.startAllMicroservices();

    await app.listen(HTTP_PORT);
    logger.trace(`Service has been started on port: ${HTTP_PORT}`);
}

/**
 *
 */
async function closeApp(app: INestApplication, sig: string) {
    setTimeout(() => {
        logger.warn(`Процесс будет завершен по таймауту ${sig}`, 'closeApp', {
            TIMEOUT_SIGTERM_MS,
        });
        process.exit(1);
    }, TIMEOUT_SIGTERM_MS);

    // Здесь все аккуратно завершаем

    logger.trace(`Процесс будет завершен ${sig}`, 'closeApp');
    process.exit(1);
}

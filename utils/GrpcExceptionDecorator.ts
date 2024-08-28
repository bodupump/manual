import { EGrpcStatusCode } from '@infrastructure/grpc/EGrpcStatusCode';
import { RpcException } from '@nestjs/microservices';
import { ILogger } from '@app/interfaces/logger/ILogger';
import { LoggerPino } from '@infrastructure/logger_pino/LoggerPino';

export function GrpcExceptionDecorator(): MethodDecorator {
    return function gRpcExceptionDescriptor(
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        const originalMethodName = String(propertyKey);
        const className = target?.constructor?.name;
        const logContext = `${className}.${String(originalMethodName)}`;

        descriptor.value = async function replacementMethod(...args: any) {
            const logger: ILogger = new LoggerPino();
            try {
                setFunctionName(replacementMethod, originalMethodName);
                return await originalMethod.apply(this, args);
            } catch (e) {
                logger.error(e, logContext, {
                    e,
                });
                let message;
                const code = EGrpcStatusCode.UNKNOWN;
                if (e instanceof Error) {
                    message = `${e.message} :: ${JSON.stringify(e.cause)}`;
                } else {
                    message = JSON.stringify(e);
                }
                throw new RpcException({
                    code,
                    message,
                });
            }
        };

        return descriptor;
    };
}

/**
 *
 */
function setFunctionName(
    replacementMethod: object,
    originalMethodName: string,
): void {
    const descriptorName = Object.getOwnPropertyDescriptor(
        replacementMethod,
        'name',
    );
    if (descriptorName) {
        descriptorName.value = originalMethodName;
        Object.defineProperty(replacementMethod, 'name', descriptorName);
    }
}

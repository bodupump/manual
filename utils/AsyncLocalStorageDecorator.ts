import { AsyncLocalStorageSingleton } from './AsyncLocalStorageSingleton';
import { v4 as uuid } from 'uuid';

export function AsyncLocalStorageDecorator({
    isReceiveLangId = true,
    isReceiveTraceId = true,
    isReceiveChatId = true,
}: {
    isReceiveLangId?: boolean;
    isReceiveTraceId?: boolean;
    isReceiveChatId?: boolean;
} = {}): MethodDecorator {
    return function gRpcExceptionDescriptor(
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        const originalMethodName = String(propertyKey);

        descriptor.value = async function replacementMethod(...args: any) {
            const [, metadata] = args;
            const asyncLocalStorage = AsyncLocalStorageSingleton.getInstance();
            return await asyncLocalStorage.run(new Map(), async () => {
                if (isReceiveLangId) {
                    const [langId] = metadata.get('langId') ?? [];
                    console.log({ langId, asyncLocalStorage });
                    asyncLocalStorage.getStore()?.set('langId', langId);
                }
                if (isReceiveTraceId) {
                    const [traceId] = metadata.get('traceId') ?? [];
                    asyncLocalStorage
                        .getStore()
                        ?.set('traceId', traceId ?? uuid());
                }
                if (isReceiveChatId) {
                    const [chatId] = metadata.get('chatId') ?? [];
                    asyncLocalStorage.getStore()?.set('chatId', chatId);
                }
                setFunctionName(replacementMethod, originalMethodName);
                return await originalMethod.apply(this, args);
            });
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

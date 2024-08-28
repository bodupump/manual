import { Global, Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AsyncLocalStorageSingleton } from '@utils/AsyncLocalStorageSingleton';

@Global()
@Module({
    imports: [AsyncLocalStorage],
    providers: [
        {
            provide: AsyncLocalStorage,
            useFactory: () => AsyncLocalStorageSingleton.getInstance(),
        },
    ],
    exports: [AsyncLocalStorage],
})
export class AsyncLocalStorageModule {}

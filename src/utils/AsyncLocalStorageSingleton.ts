import { AsyncLocalStorage } from 'node:async_hooks';

export class AsyncLocalStorageSingleton {
    private static _instance: AsyncLocalStorage<any>;
    public static getInstance() {
        return this._instance ?? (this._instance = new AsyncLocalStorage());
    }
}

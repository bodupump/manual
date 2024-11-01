import { Observable } from 'rxjs';

export interface IRpcClient {
    exec<
        TResult = object,
        TInput = object,
    >(
        method: string,
        data: TInput,
    ): Promise<TResult>;
    send<
        TResult = object,
        TInput = object,
    >(
        method: string,
        data: TInput,
    ): Observable<TResult>;
}

export const IRpcClient = Symbol('IRpcClient');

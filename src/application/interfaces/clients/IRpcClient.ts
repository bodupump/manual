export interface IRpcClient {
    exec<
        TResult = object,
        TInput = object,
    >(
        method: string,
        data: TInput,
    ): Promise<TResult>;
}

export const IRpcClient = Symbol('IRpcClient');

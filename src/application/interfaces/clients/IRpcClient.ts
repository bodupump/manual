import { TUuid } from '../../../utils/TUuid';

export interface IRpcClient {
    exec<
        TResult = object,
        TInput = object,
    >(
        method: string,
        data: TInput,
        meta?: {
            chatId?: string,
            traceId?: TUuid,
        },
    ): Promise<TResult>;
}

export const IRpcClient = Symbol('IRpcClient');

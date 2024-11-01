import axios from 'axios';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { Exception } from '../../../application/exceptions/Exception';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { InternalServerErrorException } from '../../../application/exceptions/InternalServerErrorException';
import { LoggerPino } from '../../logger_pino/LoggerPino';
import { config } from '../../../config/config';
import { firstValueFrom } from 'rxjs';
import { IRpcClient } from '../../../application/interfaces/clients/IRpcClient';

const URL = config.rpcHttpClient.url;

export class RpcHttpClient extends ClientProxy implements IRpcClient {
    private readonly logger: ILogger;

    /**
     *
     */
    constructor() {
        super();
        this.logger = new LoggerPino();
    }

    /**
     *
     */
    async exec<
        TResult = object,
        TInput = object,
    >(
        method: string,
        data: TInput,
    ): Promise<TResult> {
        return firstValueFrom(this.send<TResult, TInput>(method, data));
    }

    /**
     *
     */
    async connect(): Promise<any> {
        console.log('RpcHttpClient connect');
    }

    /**
     *
     */
    async close() {
        console.log('RpcHttpClient close');
    }

    /**
     *
     */
    publish(
        packet: ReadPacket<any>,
        callback: (packet: WritePacket<any>) => void,
    ): () => void {
        const { pattern: method, data } = packet;
        axios({
            method: 'post',
            url: `${URL}/rpc/${method}`,
            data,
        }).then(responce => {
            callback({ response: responce.data });
        }).catch(e => {
            if (e.response) {
                callback({ err: new InternalServerErrorException('Внутренняя ошибка сервера', 'RpcHttpClient.publish', e.response.data) });
            } else if (e.request) {
                callback({ err: new InternalServerErrorException('The request was made but no response was received', 'RpcHttpClient.publish', e.request) });
            } else {
                callback({ err: new Exception('Something happened in setting up the request that triggered an Error', 'RpcHttpClient.publish', e.message) });
            }
        });

        return () => console.log('RpcHttpClient teardown');
    }

    /**
     * Note, if you don't need a request-response communication style support,
     * you can leave publish() method empty.
     * Likewise, if you don't need to support event-based communication,
     * skip the dispatchEvent() method.
     */
    async dispatchEvent(packet: ReadPacket<any>): Promise<any> {}
}

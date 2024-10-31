import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { config } from '../../../config/config';

const URL = config.rpcHttpClient.url;

export class RpcHttpClient extends ClientProxy {
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
            if (responce.status === 200) {
                callback({ response: responce.data });
            } else {
                //
            }
        }).catch(e => {
            //
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

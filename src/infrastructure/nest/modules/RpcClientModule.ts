import { Global, Module } from '@nestjs/common';
import { IRpcClient } from '../../../application/interfaces/clients/IRpcClient';
import { RpcHttpClient } from '../transporters/RpcHttpClient';

@Global()
@Module({
    providers: [
        {
            provide: IRpcClient,
            useFactory: (): IRpcClient => {
                return new RpcHttpClient();
            },
        },
    ],
    exports: [IRpcClient],
})
export class RpcClientModule {}

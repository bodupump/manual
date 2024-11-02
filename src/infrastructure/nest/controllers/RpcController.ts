import { Controller, Inject } from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { IMeta } from '../../../application/interfaces/clients/IMeta';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RpcController {
    constructor(@Inject(ILogger) private readonly logger: ILogger) {
        this.logger.setContext('RpcController');
    }

    /**
     *
     */
    @MessagePattern('echo')
    async echo(@Payload() data: object, @Ctx() meta: IMeta) {
        console.log({ meta });
        return data;
    }
}

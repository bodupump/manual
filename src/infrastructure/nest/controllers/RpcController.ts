import { Controller, Inject } from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RpcController {
    constructor(@Inject(ILogger) private readonly logger: ILogger) {
        this.logger.setContext('RpcController');
    }

    /**
     *
     */
    @MessagePattern('echo')
    async echo(@Payload() data: object) {
        return data;
    }
}

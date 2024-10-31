import { Controller, Inject } from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RpcHttpController {
    constructor(@Inject(ILogger) private readonly logger: ILogger) {
        this.logger.setContext('RpcHttpController');
    }

    /**
     *
     */
    @MessagePattern('echo')
    async echo(@Payload() data: object) {
        return data;
    }
}

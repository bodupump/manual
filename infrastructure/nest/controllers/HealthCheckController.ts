import { Controller, Get, Inject } from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';

@Controller('manual')
export class HealthCheckController {
    constructor(@Inject(ILogger) private readonly logger: ILogger) {
        this.logger.setContext('HealthCheckController');
    }

    /**
     *
     */
    @Get('health')
    public async health() {
        this.logger.trace('manual - ok', 'health');
        return { message: 'manual - ok' };
    }
}

import {
    Controller,
    Inject,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { AsyncLocalStorageDecorator } from '../../../utils/AsyncLocalStorageDecorator';
import { GrpcExceptionFilter } from '../exception_filters/GrpcExceptionFilter';
import { LoggingGrpcInterceptor } from '../interceptors/LoggingGrpcInterceptor';
import { GrpcMethod } from '@nestjs/microservices';
import { IBarRepository } from '../../../application/interfaces/repository/IBarRepository';
import { BarDto } from '../../../domain/Bar';

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(LoggingGrpcInterceptor)
export class BarController {
    /**
     *
     */
    constructor(
        @Inject(IBarRepository)
        private readonly barRepository: IBarRepository,
    ) {}

    /**
     *
     */
    @GrpcMethod('BarService', 'getBar')
    @AsyncLocalStorageDecorator()
    async getBar(req: GetBarRequest): Promise<BarDto> {
        // console.log('metadata', metadata);
        const { id } = req;
        const bar = await this.barRepository.get(id);
        return bar.toDto();
    }
}

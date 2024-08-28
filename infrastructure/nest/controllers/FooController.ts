import {
    Controller,
    Get,
    Inject,
    Param,
} from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { v4 as uuid } from 'uuid';
import { IFooService } from '../../../application/interfaces/services/microservice_01/foo/IFooService';
import { BarDto } from '../../../domain/Bar';
import { NoteService } from '../../../application/services/NoteService';

const TIMEOUT_MS = 1000;

@Controller('foo')
export class FooController {
    constructor(
        @Inject(ILogger) private readonly logger: ILogger,
        @Inject(NoteService) private readonly noteService: NoteService,
        @Inject(IFooService) private readonly fooService: IFooService,
    ) {
        this.logger.setContext('MuscleController');
    }

    /**
     *
     */
    @Get('bar/:barId')
    public async getBar(
        @Param() { barId }: { barId: string },
    ): Promise<BarDto> {
        const meta = new Metadata();
        const traceId = uuid();
        meta.set('traceId', traceId);

        const deadline = new Date().getTime() + TIMEOUT_MS;
        const req = {
            id: barId,
        };
        const barDto = await firstValueFrom(
            this.fooService.getFoo(req, meta, { deadline }),
        );
        return barDto;
    }
}

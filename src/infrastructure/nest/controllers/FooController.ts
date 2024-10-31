import {
    Body,
    Controller,
    Get,
    Inject,
    Param, Post,
} from '@nestjs/common';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { v4 as uuid } from 'uuid';
import { IFooService } from '../../../application/interfaces/services/microservice_01/IFooService';
import { NoteService } from '../../../application/services/NoteService';
import { FooDto } from '../../../domain/Foo';
import { IRpcClient } from '../../../application/interfaces/clients/IRpcClient';

const TIMEOUT_MS = 1000;

@Controller('foo')
export class FooController {
    constructor(
        @Inject(ILogger) private readonly logger: ILogger,
        @Inject(NoteService) private readonly noteService: NoteService,
        @Inject(IFooService) private readonly fooService: IFooService,
        @Inject(IRpcClient) private readonly rpcClient: IRpcClient,
    ) {
        this.logger.setContext('FooController');
    }

    /**
     *
     */
    @Get('bar/:barId')
    public async getBar(
        @Param() { barId }: { barId: string },
    ): Promise<FooDto> {
        const meta = new Metadata();
        const traceId = uuid();
        meta.set('traceId', traceId);

        const deadline = new Date().getTime() + TIMEOUT_MS;
        const req = {
            id: barId,
        };
        const fooDto = await firstValueFrom(
            this.fooService.getFoo(req, meta, { deadline }),
        );
        return fooDto;
    }

    /**
     *
     */
    @Post('/testRpcHttp')
    public async testRpcHttp(
        @Body() body: object,
    ): Promise<any> {
        const res = await this.rpcClient.exec('echo', body);
        return res;
    }
}

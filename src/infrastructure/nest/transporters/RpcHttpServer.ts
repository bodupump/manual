import express from 'express';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { EStatus } from '../../../application/exceptions/EStatus';
import { Exception } from '../../../application/exceptions/Exception';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { LoggerPino } from '../../logger_pino/LoggerPino';
import { MethodNotAllowedException } from '../../../application/exceptions/MethodNotAllowedException';
import { config } from '../../../config/config';

const PORT = config.rpcHttpServer.port;
const DEFAULT_ERROR_STATUS = EStatus.INTERNAL_SERVER_ERROR;

export class RpcHttpServer extends Server implements CustomTransportStrategy {
    private readonly _logger: ILogger;

    /**
     *
     */
    constructor() {
        super();
        this._logger = new LoggerPino();
    }

    /**
     * This method is triggered when you run "app.listen()".
     */
    async listen(callback: () => void) {
        console.log(this.messageHandlers);

        const app = express();
        app.use(express.json());

        app.post('/rpc/:method', async (req, res, next) => {
            try {
                const method = req.params['method'];
                const handler = this.messageHandlers.get(method);
                if (!handler) {
                    throw new MethodNotAllowedException('Метод не поддерживается', 'RpcHttpServer.listen', { method });
                }
                const result = await handler(req.body);
                res.status(200).json(result);
            } catch(e) {
                next(e);
            }
        });

        app.use((e: any, req: any, res: any, next: any) => {
            this._logger.error(e);
            if (res.headersSent) return next(e);
            const status = e instanceof Exception ? e.status : DEFAULT_ERROR_STATUS;
            res.status(status).json(e);
        });

        app.listen(PORT, () => {
            console.log(`RpcHttpServer listening on port ${PORT}`);
        });

        callback();
    }

    /**
     * This method is triggered on application shutdown.
     */
    close() {}
}

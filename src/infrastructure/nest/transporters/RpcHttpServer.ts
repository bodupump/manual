import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import express from 'express';
import { config } from '../../../config/config';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { LoggerPino } from '../../logger_pino/LoggerPino';

const PORT = config.rpcHttpServer.port;

export class RpcHttpServer extends Server implements CustomTransportStrategy {
    private readonly _logger: ILogger;

    /**
     *
     */
    constructor() {
        super();
        this._logger = new LoggerPino();
        this._logger.setContext('RpcHttpServer');
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
                const echoHandler = this.messageHandlers.get(method);
                const result = echoHandler && await echoHandler(req.body);
                res.status(200).json(result);
            } catch(e) {
                this._logger.error(e);
                next(e);
            }
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

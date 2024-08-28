import { Exception } from './Exception';
import { EStatus } from './EStatus';

export class GatewayTimeoutException extends Exception {
    readonly status: number = EStatus.GATEWAY_TIMEOUT;
}

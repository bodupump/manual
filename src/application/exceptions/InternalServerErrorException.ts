import { Exception } from './Exception';
import { EStatus } from './EStatus';

export class InternalServerErrorException extends Exception {
    readonly status: number = EStatus.INTERNAL_SERVER_ERROR;
}

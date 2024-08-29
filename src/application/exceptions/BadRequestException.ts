import { Exception } from './Exception';
import { EStatus } from './EStatus';

export class BadRequestException extends Exception {
    readonly status: number = EStatus.BAD_REQUEST;
}

import { Exception } from './Exception';
import { EStatus } from './EStatus';

export class UnauthorizedException extends Exception {
    readonly status: number = EStatus.UNAUTHORIZED;
}

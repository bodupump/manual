import { Exception } from './Exception';
import { EStatus } from './EStatus';


export class ForbiddenException extends Exception {
    readonly status: number = EStatus.FORBIDDEN;
}

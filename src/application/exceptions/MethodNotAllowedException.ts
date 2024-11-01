import { Exception } from './Exception';
import { EStatus } from './EStatus';

export class MethodNotAllowedException extends Exception {
    readonly status: number = EStatus.METHOD_NOT_ALLOWED;
}

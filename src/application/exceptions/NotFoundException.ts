import { Exception } from '@app/exceptions/Exception';
import { EStatus } from '@app/exceptions/EStatus';

export class NotFoundException extends Exception {
    readonly status: number = EStatus.NOT_FOUND;
}

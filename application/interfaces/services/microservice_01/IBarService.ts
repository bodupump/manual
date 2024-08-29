import { CallOptions, Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { GetFooRequest } from './GetFooRequest';
import { BarDto } from '../../../../../domain/Bar';

export interface IBarService {
    getBar(
        body: GetFooRequest,
        metadata?: Metadata,
        options?: CallOptions,
    ): Observable<BarDto>;
}

export const IBarService = Symbol('IBarService');

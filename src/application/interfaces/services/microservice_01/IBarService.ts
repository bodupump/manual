import { CallOptions, Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { BarDto } from '../../../../domain/Bar';
import { GetBarRequest } from './bar/GetBarRequest';

export interface IBarService {
    getBar(
        body: GetBarRequest,
        metadata?: Metadata,
        options?: CallOptions,
    ): Observable<BarDto>;
}

export const IBarService = Symbol('IBarService');

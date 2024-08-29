import { CallOptions, Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { GetFooRequest } from './foo/GetFooRequest';
import { FooDto } from '../../../../domain/Foo';

export interface IFooService {
    getFoo(
        body: GetFooRequest,
        metadata?: Metadata,
        options?: CallOptions,
    ): Observable<FooDto>;
}

export const IFooService = Symbol('IFooService');

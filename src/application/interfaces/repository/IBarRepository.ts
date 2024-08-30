import { Bar, CreateBarDto } from '../../../domain/Bar';
import { BarManyQuery, BarOneQuery } from '../../queries/Bar';
import { BarRepositoryResponse } from '../../responces/Bar';
import { TPagination } from '../../../utils/TPagination';

export interface IBarRepository {
    getMany(query?: BarManyQuery): Promise<BarRepositoryResponse>;
    getOne(query?: BarOneQuery): Promise<Bar>;
    findByNameLike(args: {
        filter: { name: string };
        pagination?: TPagination;
    }): Promise<BarRepositoryResponse>;
    create(dto: CreateBarDto): Promise<Bar>;
    update(bar: Bar): Promise<void>;
    delete(id: string): Promise<void>;
}

export const IBarRepository = Symbol('IBarRepository');

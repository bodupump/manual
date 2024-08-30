import { v4 } from 'uuid';
import { IBarRepository } from '../../../application/interfaces/repository/IBarRepository';
import { BarManyQuery, BarOneQuery } from '../../../application/queries/Bar';
import { BarRepositoryResponse } from '../../../application/responces/Bar';
import { BarTarget } from '../../../application/targets/Bar';
import { Bar, CreateBarDto } from '../../../domain/Bar';
import { AsyncLocalStorage } from 'node:async_hooks';
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { NotFoundException } from '../../../application/exceptions/NotFoundException';

export class BarRepository implements IBarRepository {
    private static repository: Bar[] = [];

    /**
     *
     */
    constructor(
        private readonly logger: ILogger,
        private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    ) {
        this.logger.setContext(BarRepository.name);
    }

    async getMany(query?: BarManyQuery): Promise<BarRepositoryResponse> {
        let pagination = {
            limit: 25,
            offset: 1,
            page: 1,
        };
        let bars: Bar[] = [];
        if (query) {
            if (query.limit) {
                pagination.limit = query.limit;
            }
            if (query.offset) {
                pagination.offset = (query.offset - 1) * pagination.limit;
                pagination.page = query.offset;
            }
            if (query.target) {
                switch (query.target) {
                    case BarTarget.name: {
                        bars = BarRepository.repository
                            .filter((b) => b.name === query.value)
                            .slice(pagination.offset)
                            .slice(0, pagination.limit);
                        break;
                    }
                    default: {
                        bars = BarRepository.repository
                            .slice(pagination.offset)
                            .slice(0, pagination.limit);
                        break;
                    }
                }
            }
        } else {
            bars = BarRepository.repository
                .slice(pagination.offset)
                .slice(0, pagination.limit);
        }
        return new BarRepositoryResponse(
            BarRepositoryResponse.length,
            BarRepositoryResponse.length / pagination.limit,
            pagination.page,
            pagination.limit,
            bars,
        );
    }

    async getOne(query?: BarOneQuery): Promise<Bar> {
        if (query) {
            const resp = BarRepository.repository.find(
                (b) => b.id === query.value,
            );
            if (resp) {
                return resp;
            }
            throw new NotFoundException('404');
        }
        throw new NotFoundException('404');
    }

    async create(dto: CreateBarDto): Promise<Bar> {
        const bar = new Bar(dto.id ?? v4(), dto.name, [], new Date());
        BarRepository.repository.push(bar);
        return bar;
    }
    async update(bar: Bar): Promise<void> {
        const barIndex = BarRepository.repository.findIndex(
            (b) => b.id === bar.id,
        );
        if (!barIndex || barIndex == -1) {
            throw new Error('404');
        }
        BarRepository.repository[barIndex] = bar;
    }
    async delete(id: string): Promise<void> {
        const barIndex = BarRepository.repository.findIndex((b) => b.id === id);
        if (!barIndex || barIndex == -1) {
            throw new NotFoundException('404');
        }
        BarRepository.repository.filter((bar) => bar.id !== id);
    }
}

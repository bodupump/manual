import { v4 } from "uuid";
import { IFooRepository } from "../../../application/interfaces/repository/IFooRepository";
import { FooManyQuery, FooOneQuery } from "../../../application/queries/Foo";
import { FooRepositoryResponse } from "../../../application/responces/Foo";
import { FooTarget } from "../../../application/targets/Foo";
import { Foo, CreateFooDto } from "../../../domain/Foo";
import { ILogger } from '../../../application/interfaces/logger/ILogger';
import { AsyncLocalStorage } from 'node:async_hooks';

export class FooRepository implements IFooRepository {
    private static repository : Foo[] = [];

    /**
     *
     */
    constructor(
        private readonly logger: ILogger,
        private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    ) {
        this.logger.setContext(FooRepository.name);
    }

    async getMany(query?: FooManyQuery): Promise<FooRepositoryResponse> {
        let pagination = {
            limit : 25,
            offset : 1,
            page : 1
        };
        let foos : Foo[] = [];
        if (query) {
            if (query.limit) {
                pagination.limit = query.limit;
            }
            if (query.offset) {
                pagination.offset = (query.offset-1) * pagination.limit;
                pagination.page = query.offset;
            } 
            if (query.target) {
                switch(query.target) {
                    case FooTarget.name : {
                        foos = FooRepository.repository
                        .filter(b => b.name === query.value)
                        .slice(pagination.offset) 
                        .slice(0, pagination.limit);
                        break;
                    }
                    default : {
                        foos = FooRepository.repository
                        .slice(pagination.offset) 
                        .slice(0, pagination.limit);
                        break;
                    }
                }
            }
        } else {
            foos = FooRepository.repository
            .slice(pagination.offset) 
            .slice(0, pagination.limit);
        }
        return new FooRepositoryResponse(
            FooRepositoryResponse.length,
            FooRepositoryResponse.length / pagination.limit,
            pagination.page,
            pagination.limit,
            foos
        )
    }
    async getOne(query?: FooOneQuery): Promise<Foo> {
        if (query) {
            const resp = FooRepository.repository.find(b => b.id === query.value);
            if (resp) {
                return resp;
            }
            throw new Error("404");
        }
        throw new Error("404");
    }
    async create(dto: CreateFooDto): Promise<Foo> {

        const bar = new Foo(v4(),dto.name, dto.bar);
        FooRepository.repository.push(bar);
        return bar;
    }
    async update(foo: Foo): Promise<void> {
        const barIndex = FooRepository.repository.findIndex(f => f.id === foo.id);
        if (!barIndex || barIndex == -1) {
            throw new Error("404");
        }
        FooRepository.repository[barIndex] = foo;
    }
}
import { CreateFooDto, Foo } from "../../../domain/Foo";
import { FooManyQuery, FooOneQuery } from "../../queries/Foo";
import { FooRepositoryResponse } from "../../responces/Foo";

export interface IFooRepository {
    getMany (query? : FooManyQuery) : Promise<FooRepositoryResponse>;
    getOne(query? : FooOneQuery) : Promise<Foo>;
    create(dto : CreateFooDto) : Promise<Foo>;
    update (foo : Foo) : Promise<void>;
}
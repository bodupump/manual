import { CreateFooDto, Foo } from "../../../domain/Foo";

export interface IFooRepository {
    get() : Promise<Foo[]>;
    create(dto : CreateFooDto) : Promise<Foo>;
}
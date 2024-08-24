import { Bar, CreateBarDto } from "../../../domain/Bar";
import { BarManyQuery, BarOneQuery } from "../../queries/Bar";
import { BarRepositoryResponse } from "../../responces/Bar";

export interface IBarRepository {
    getMany (query? : BarManyQuery) : Promise<BarRepositoryResponse>;
    getOne(query? : BarOneQuery) : Promise<Bar>;
    create(dto : CreateBarDto) : Promise<Bar>;
    update(bar : Bar) : Promise<void>;
    delete(id : string) : Promise<void>;
}
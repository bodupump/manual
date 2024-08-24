import { Bar, CreateBarDto } from "../../../domain/Bar";
import { BarQuery } from "../../queries/Bar";

export interface IBarRepository {
    get(query? : BarQuery) : Promise<Bar[]>;
    create(dto : CreateBarDto) : Promise<Bar>;
    update(bar : Bar) : Promise<void>;
    delete(id : string) : Promise<void>;
}
import { Bar, CreateBarDto } from "../../../domain/Bar";
import { BarQuerry } from "../../querries/Bar";

export interface IBarRepository {
    get(querry? : BarQuerry) : Promise<Bar[]>;
    create(dto : CreateBarDto) : Promise<Bar>;
    update(bar : Bar) : Promise<void>;
    delete(id : string) : Promise<void>;
}
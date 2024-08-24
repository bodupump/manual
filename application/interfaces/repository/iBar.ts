import { Bar, CreateBarDto } from "../../../domain/Bar";

export interface IBarRepository {
    get() : Promise<Bar[]>;
    create(dto : CreateBarDto) : Promise<Bar>;
    update(bar : Bar) : Promise<void>;
    delete(id : string) : Promise<void>;
}
import { Foo, FooDto } from './Foo';

export class Bar {
    readonly id: string;
    readonly name: string;
    readonly foos: Foo[];
    readonly date: Date;

    constructor(id: string, name: string, foos: Foo[], date: Date) {
        this.id = id;
        this.name = name;
        this.foos = foos;
        this.date = date;
    }

    toDto(): BarDto {
        return {
            id: this.id,
            name: this.name,
            foos: this.foos.map((foo) => foo.toDto()),
            date: this.date.toISOString(),
        };
    }
}

export interface CreateBarDto {
    id?: string;
    name: string;
}

export interface BarDto {
    id: string;
    name: string;
    foos: FooDto[];
    date: string;
}

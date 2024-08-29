import { Bar, BarDto } from './Bar';

export class Foo {
    readonly id: string;
    readonly name: string;
    readonly bar: Bar;

    constructor(id: string, name: string, bar: Bar) {
        this.id = id;
        this.name = name;
        this.bar = bar;
    }

    toDto(): FooDto {
        return {
            id: this.id,
            name: this.name,
            bar: this.bar.toDto(),
        };
    }
}

export interface CreateFooDto {
    name: string;
    bar: Bar;
}

export interface FooDto {
    id: string;
    name: string;
    bar: BarDto;
}

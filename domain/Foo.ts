import { Bar } from "./Bar";

export class Foo {
    readonly id : string;
    readonly name : string;
    readonly bar : Bar

    constructor(id : string, name : string, bar : Bar) {
        this.id = id;
        this.name = name;
        this.bar = bar;
    }
}

export interface CreateFooDto {
    name : string;
    bar : Bar;
}
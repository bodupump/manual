import { Bar } from "./Bar";

export class Foo {
    id : string;
    name : string;
    bar : Bar

    constructor(id : string, name : string, bar : Bar) {
        this.id = id;
        this.name = name;
        this.bar = bar;
    }
}

export interface CreateFooDto {
    name : string;
    barId : string;
}
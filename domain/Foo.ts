import { Bar } from "./Bar";

export class Foo {
    id : string;
    name : string;
    bar : Bar

    constructor(foo : Foo) {
        this.id = foo.id;
        this.name = foo.name;
        this.bar = foo.bar;
    }
}

export interface CreateFooDto {
    name : string;
    barId : string;
}
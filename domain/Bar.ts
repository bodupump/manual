import { Foo } from "./Foo";

export class Bar {
    id : string;
    name : string;
    foos : Foo[];

    constructor(bar : Bar ) {
        this.id = bar.id;
        this.name = bar.name;
        this.foos = bar.foos;
    }
}
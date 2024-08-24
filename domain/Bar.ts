import { Foo } from "./Foo";

export class Bar {
    id : string;
    name : string;
    foos : Foo[];

    constructor( id : string, name : string, foos : Foo[] ) {
        this.id = id;
        this.name = name;
        this.foos = foos;
    }
}


export interface CreateBarDto {
    name : string;
}
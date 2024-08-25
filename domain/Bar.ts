import { Foo } from "./Foo";

export class Bar {
    readonly id : string;
    readonly name : string;
    readonly foos : Foo[];
    readonly date : Date;

    constructor( id : string, name : string, foos : Foo[], date : Date ) {
        this.id = id;
        this.name = name;
        this.foos = foos;
        this.date = date;
    }
}


export interface CreateBarDto {
    name : string;
}
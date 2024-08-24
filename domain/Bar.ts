import { Foo } from "./Foo";

export class Bar {
    id : string;
    name : string;
    foos : Foo[];
    date : Date;

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
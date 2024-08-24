import { Foo } from "../../domain/Foo";

export class FooRepositoryResponse {
    totalCount : number;
    totalPageCount : number;
    page : number;
    perPage : number;
    bars : Foo[];

    constructor(
        totalCount : number,
        totalPageCount : number,
        page : number,
        perPage : number,
        bars : Foo[]
    ) {
        this.totalCount = totalCount;
        this.totalPageCount = totalPageCount;
        this.page = page;
        this.perPage = perPage;
        this.bars = bars;
    }
}
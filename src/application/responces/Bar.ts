import { Bar } from "../../domain/Bar";

export class BarRepositoryResponse {
    totalCount : number;
    totalPageCount : number;
    page : number;
    perPage : number;
    bars : Bar[];

    constructor(
        totalCount : number,
        totalPageCount : number,
        page : number,
        perPage : number,
        bars : Bar[]
    ) {
        this.totalCount = totalCount;
        this.totalPageCount = totalPageCount;
        this.page = page;
        this.perPage = perPage;
        this.bars = bars;
    }
}
import { Bar } from "../../domain/Bar";

export class BarRepositoryResponse {
    totalCount : number;
    totalPageCount : number;
    page : number;
    perPage : number;
    bars : Bar[];

    constructor(
        totalCount : number,
        page : number,
        perPage : number,
        bars : Bar[]
    ) {
        this.totalCount = totalCount;
        this.perPage = perPage;
        this.bars = bars;
        this.totalPageCount = Math.ceil(this.totalCount / this.perPage);
        this.page = page;

    }
}
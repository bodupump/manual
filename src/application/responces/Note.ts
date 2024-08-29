import { Note } from "../../domain/Note";


export class NoteRepositoryResponse {
    totalCount : number;
    totalPageCount : number;
    page : number;
    perPage : number;
    bars : Note[];

    constructor(
        totalCount : number,
        totalPageCount : number,
        page : number,
        perPage : number,
        bars : Note[]
    ) {
        this.totalCount = totalCount;
        this.totalPageCount = totalPageCount;
        this.page = page;
        this.perPage = perPage;
        this.bars = bars;
    }
}
export class BaseQuery<T> {
    target? : T;
    value? : string;
    offset? : number;
    limit? : number;
}
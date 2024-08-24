import { BaseOneQuery } from "./BaseOneQuerry";

export class BaseManyQuery<T> extends BaseOneQuery<T> {
    offset? : number;
    limit? : number;
}
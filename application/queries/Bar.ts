import { BarTarget } from "../targets/Bar";
import { BaseManyQuery } from "./BaseManyQuery";
import { BaseOneQuery } from "./BaseOneQuerry";

export class BarManyQuery extends BaseManyQuery<BarTarget> {
    date? : {
        dateFrom : Date;
        dateTo : Date;
    }
}

export class BarOneQuery extends BaseOneQuery<BarTarget> {

}
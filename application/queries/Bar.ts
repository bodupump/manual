import { BarTarget } from "../targets/Bar";
import { BaseManyQuery } from "./BaseManyQuery";
import { BaseOneQuery } from "./BaseOneQuerry";

export class BarManyQuery extends BaseManyQuery<BarTarget> {
    includesPeriod? : {
        dateStartPeriod : Date;
        dateEndPeriod : Date;
    }
}

export class BarOneQuery extends BaseOneQuery<BarTarget> {

}
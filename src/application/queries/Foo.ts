import { FooTarget } from "../targets/Foo";
import { BaseManyQuery } from "./BaseManyQuery";
import { BaseOneQuery } from "./BaseOneQuery";

export class FooManyQuery extends BaseManyQuery<FooTarget> {

}

export class FooOneQuery extends BaseOneQuery<FooTarget> {

}
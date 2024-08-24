import { FooTarget } from "../targets/Foo";
import { BaseManyQuery } from "./BaseManyQuery";
import { BaseOneQuery } from "./BaseOneQuerry";

export class FooManyQuery extends BaseManyQuery<FooTarget> {

}

export class FooOneQuery extends BaseOneQuery<FooTarget> {

}
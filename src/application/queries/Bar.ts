import { BarTarget } from '../targets/Bar';
import { BaseManyQuery } from './BaseManyQuery';
import { BaseOneQuery } from './BaseOneQuery';

export class BarManyQuery extends BaseManyQuery<BarTarget> {
    includesPeriod?: {
        startInclude: Date;
        end: Date;
    };
}

export class BarOneQuery extends BaseOneQuery<BarTarget> {}

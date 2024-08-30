import { IBarRepository } from '../../../application/interfaces/repository/IBarRepository';
import { IFooRepository } from '../../../application/interfaces/repository/IFooRepository';
import { IUpdateFooBarNameTransaction } from '../../../application/interfaces/transaction/IUpdateFooBarName';
import { BarTarget } from '../../../application/targets/Bar';
import { FooTarget } from '../../../application/targets/Foo';
import { Bar } from '../../../domain/Bar';
import { Foo } from '../../../domain/Foo';

export class UpdateFooBarNameTransaction
    implements IUpdateFooBarNameTransaction
{
    constructor(
        private readonly fooRepository: IFooRepository,
        private readonly barRepository: IBarRepository,
    ) {}
    async update(
        fooId: string,
        barId: string,
        barName: string,
        fooName: string,
    ): Promise<void> {
        const lastFoo = await this.fooRepository.getOne({
            target: FooTarget.id,
            value: fooId,
        });
        const lastBar = await this.barRepository.getOne({
            target: BarTarget.id,
            value: barId,
        });
        try {
            const newFoo = new Foo(lastFoo.id, fooName, lastFoo.bar);
            await this.fooRepository.update(newFoo);
            const newBar = new Bar(
                lastBar.id,
                barName,
                lastBar.foos,
                lastBar.date,
            );
            await this.barRepository.update(newBar);
        } catch (e) {
            await this.fooRepository.update(lastFoo);
            await this.barRepository.update(lastBar);
        }
    }
}

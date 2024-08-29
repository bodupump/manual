import { IFooRepository } from '../interfaces/repository/IFooRepository';
import { IBarRepository } from '../interfaces/repository/IBarRepository';

export class NoteService {
    constructor(
        private readonly fooRepository: IFooRepository,
        private readonly barRepository: IBarRepository,
    ) {}

    async getHello(): Promise<string> {
        const bar = await this.barRepository.getOne();
        const foo = await this.fooRepository.create({
            name: 'foo name',
            bar,
        });
        return foo.name;
    }
}

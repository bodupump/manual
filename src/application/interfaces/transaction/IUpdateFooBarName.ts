export interface IUpdateFooBarNameTransaction {
    update (fooId : string, barId : string, barName : string, fooName : string) : Promise<void>;
}
import { ICharactersData } from "../interfaces/iCharactersData";
import { IPerson } from "../interfaces/iPerson";
import { Person } from "./character";

export class CharactersData implements ICharactersData {
    public count: number;
    public next: string;
    public previous: string;
    public _results: Person[];

    constructor(values: object = {}) {
        Object.assign(this, values)
    }

    set results(val) {
        this._results = val.map((p: IPerson) => new Person(p));
    }

    get results(): Person[] {
        return this._results;
    }
}
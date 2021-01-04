// import { IAbstractData } from "../interfaces/iCharactersData";

import { Factory } from "./factory";

export class AbstractData<T> {
    public count: number;
    public next: string;
    public previous: string;
    public results: T[];
    protected resultsType;

    constructor(values: object = {}) {
        Object.assign(this, values)
        this.results = this.results.map((p) => Factory.create(this.resultsType, p));
    }
}
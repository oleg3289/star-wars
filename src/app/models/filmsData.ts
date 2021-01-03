import { IFilm } from "../interfaces/iFilm";
import { IFilmsData } from "../interfaces/iFilmsData";
import { Film } from "./film";

export class FilmsData implements IFilmsData {
    public count: number;
    public next: string;
    public previous: string;
    public _results: Film[];

    constructor(values: object = {}) {
        Object.assign(this, values)
    }

    set results(val) {
        this._results = val.map((p: IFilm) => new Film(p));
    }

    get results(): Film[] {
        return this._results;
    }
}
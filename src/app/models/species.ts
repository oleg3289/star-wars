import { ISpecies } from "../interfaces/iSpecies";

export class Species implements ISpecies {
    public id: number;
    public average_height: string;
    public average_lifespan: string;
    public classification: string;
    public created: string;
    public designation: string;
    public edited: string;
    public eye_colors: string;
    public hair_colors: string;
    public homeworld: string;
    public language: string;
    public name: string;
    public people: string;
    public films: string;
    public skin_colors: string;
    private _url: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }

    set url(val) {

        let particles = val.split('/').filter((s) => s);
        this.id = +particles[particles.length-1];

        this._url = val;
    }

    get url() {
        return this._url;
    }

}
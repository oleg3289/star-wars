import { IStarship } from "../interfaces/iStarship";

export class Starship implements IStarship {
    public id: number;
    public MGLT: string;
    public cargo_capacity: string;
    public consumables: string;
    public cost_in_credits: string;
    public created: string;
    public crew: string;
    public edited: string;
    public hyperdrive_rating: string;
    public length: string;
    public manufacturer: string;
    public max_atmosphering_speed: string;
    public model: string;
    public name: string;
    public passengers: string;
    public films: string[];
    public pilots: string[];
    public starship_class: string;
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
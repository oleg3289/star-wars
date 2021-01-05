import { ICharacter } from '../interfaces/iCharacter';

export class Character implements ICharacter {
    public id: number;
    public birth_year_num: number;
    public birth_mark: string;
    public eye_color: string;
    public gender: string;
    public hair_color: string;
    public height: string;
    public homeworld: string;
    public mass: string;
    public name: string;
    public skin_color: string;
    public created: string;
    public edited: string;
    public starships: string[];
    public vehicles: string[];
    public episode_ids?: number[] = [];
    public species_ids?: number[] = [];
    private _url: string;
    private _species: string[];
    private _films: string[];
    private _birth_year: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }

    set films(val: string[]) {
        let ep_ids = val.map((v: string) => {
            let particles: string[] = v.split('/').filter((s: string) => s);
            let id: number = +particles[particles.length-1];
            return id;
        })
        
        this.episode_ids.push(...ep_ids);

        this._films = val;
    }

    get films(): string[] {
        return this._films;
    }

    set species(val) {
        let sp_ids = val.map((v: string) => {
            let particles: string[] = v.split('/').filter((s: string) => s);
            let id: number = +particles[particles.length-1];
            return id;
        })

        this.species_ids.push(...sp_ids)

        this._species = val;
    }

    get species() {
        return this._species;
    }

    set birth_year(val) {
        if (val === 'unknown') {
            this._birth_year = null;
            return;
        }

        this.birth_mark = val.match(/BBY|ABY/)[0];
        if (this.birth_mark === 'BBY') this.birth_year_num = -(+val.match(/\d+/g)[0]);
        if (this.birth_mark === 'ABY') this.birth_year_num = +val.match(/\d+/g)[0];
        

        this._birth_year = val;
    }

    get birth_year() {
        return this._birth_year;
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
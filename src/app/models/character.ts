import { ICharacter } from '../interfaces/iCharacter';

export class Character implements ICharacter {
    public birth_year: string;
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
    public url: string;
    public vehicles: string[];
    public episode_ids?: number[] = [];
    public species_ids?: number[] = [];
    private _species: string[];
    private _films: string[];

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
}
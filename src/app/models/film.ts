export class Film {
    public id: number;
    public title: string;
    public episode_id: number;
    public opening_crawl: string;
    public director: string;
    public producer: string;
    public release_date: string;
    public characters: string[];
    public planets: string[];
    public starships: string[];
    public vehicles: string[];
    public species: string[];
    public created: string;
    public edited: string;
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
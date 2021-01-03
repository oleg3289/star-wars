export class Film {
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
    public url: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }
}
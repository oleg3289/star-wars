import { ISongData } from '../interfaces/songData';

export class SongData implements ISongData {
    public artist: string;
    public songName: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }
}
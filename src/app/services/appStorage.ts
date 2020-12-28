import { Injectable } from "@angular/core";
import { GetService } from './getService';
import { SongData } from '../models/songData';
import { map, tap, mergeMap } from 'rxjs/operators';
import { ISongData } from '../interfaces/songData';
import { of, Observable } from 'rxjs';

@Injectable()
export class AppStorageService {
    public songs: SongData[]
    public songCol: string = `songs`;

    constructor(
        private GS: GetService
    ) {}

    public getSongs(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getSongsData<SongData, ISongData>(this.songCol, SongData).pipe(
                map((res) => {
                    this.songs = res
                })
            )),
            map(() => true)
        )
    }
}
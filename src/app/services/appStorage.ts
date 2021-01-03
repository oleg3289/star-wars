import { Injectable } from "@angular/core";
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ICharactersData } from "../interfaces/iCharactersData";
import { Person } from '../models/character';
import { CharactersData } from "../models/charactersData";
import { Film } from "../models/film";
import { FilmsData } from "../models/filmsData";
import { GetService } from './getService';

@Injectable()
export class AppStorageService {
    public allCharacters: Person[] = [];
    public allFilms: Film[] = [];

    private peoplePath: string = `people`;
    private filmsPath: string = `films`;

    private requests: any[] = [];

    public isDataReady$ = new Subject();

    constructor(
        private GS: GetService
    ) {}

    /**
     * 1. Receive the first page people list
     * 2. Define a number of pages
     * 3. Receive the rest of the Star Wars characters
     */
    public getFirstPagePeople(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getPeopleByPage<CharactersData, ICharactersData>(this.peoplePath, CharactersData, `1`).pipe(
                map((res: CharactersData) => {

                    this.allCharacters.push(...res.results);
                    
                    return res.count; 

                }),
                tap((count) => {

                    // 10 person per page
                    // let compute a number of pages
                    const numOfPages = Math.ceil(count / 10);

                    // the first page of people we already have
                    // so let get the rest
                    for (let i = 2; i <= numOfPages; i++) {
                        this.requests.push( this.GS.getPeopleByPage<CharactersData, ICharactersData>(this.peoplePath, CharactersData, i.toString()) );
                    }
                })
            )),
            map(() => true)
        );

    }

    /**
     * Handler for the requests array
     */
    public getRestPeople(): Observable<boolean> {
        return forkJoin(this.requests).pipe(
            map((res: CharactersData[]) => {
                res.forEach(data => {
                    this.allCharacters.push(...data.results);
                });
            }),
            map(() => true)
        )
    }

    public getMovies(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getFilms(this.filmsPath, FilmsData).pipe(
                map((res: FilmsData) => {

                    this.allFilms.push(...res.results);
                    
                })
            )),
            map(() => true)
        )
    }
}
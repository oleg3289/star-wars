import { Injectable } from "@angular/core";
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IAbstractData } from "../interfaces/iAbstractData";
import { ICharacter } from "../interfaces/iCharacter";
import { IFilm } from "../interfaces/iFilm";
import { ISpecies } from "../interfaces/iSpecies";
import { IStarship } from "../interfaces/iStarship";
import { AbstractData } from "../models/abstractData";
import { Character } from '../models/character';
import { Film } from "../models/film";
import { Species } from "../models/species";
import { Starship } from "../models/startship";
import { GetService } from './getService';

@Injectable()
export class AppStorageService {
    public allCharacters: Character[] = [];
    public allFilms: Film[] = [];
    public allSpecies: Species[] = [];
    public allStarships: Starship[] = [];

    private peoplePath: string = `people`;
    private filmsPath: string = `films`;
    private speciesPath: string = `species`;
    private starshipsPath: string = `starships`;

    private peopleRequests: any[] = [];
    private speciesRequests: any[] = [];
    private starshipsRequests: any[] = [];

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
            mergeMap(() => this.GS.getEntityByPage
                <AbstractData<Character>, IAbstractData<Character>, Character, ICharacter>
                (this.peoplePath, AbstractData, Character, `1`).pipe(
                map((res: AbstractData<Character>) => {

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
                        this.peopleRequests.push( this.GS.getEntityByPage
                            <AbstractData<Character>, IAbstractData<Character>, Character, ICharacter>
                            (this.peoplePath, AbstractData, Character, i.toString()) );
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
        return forkJoin(this.peopleRequests).pipe(
            map((res: AbstractData<Character>[]) => {
                res.forEach(data => {
                    this.allCharacters.push(...data.results);
                });
            }),
            tap(() => {
                this.allCharacters.sort((a: Character, b: Character) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    else return 0;
                })
            }),
            map(() => true)
        )
    }

    public getFilmsList(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getEntity
            <AbstractData<Film>, IAbstractData<Film>, Film, IFilm>
            (this.filmsPath, AbstractData, Film).pipe(
                map((res: AbstractData<Film>) => {

                    this.allFilms.push(...res.results);
                    
                })
            )),
            map(() => true)
        )
    }

    public getFirstPageSpecies(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getEntity
            <AbstractData<Species>, IAbstractData<Species>, Species, ISpecies>
            (this.speciesPath, AbstractData, Species).pipe(
                map((res: AbstractData<Species>) => {

                    this.allSpecies.push(...res.results);

                    return res.count; 
                    
                }),
                tap((count) => {

                    // 10 species per page
                    // let compute a number of pages
                    const numOfPages = Math.ceil(count / 10);

                    // the first page of species we already have
                    // so let get the rest
                    for (let i = 2; i <= numOfPages; i++) {
                        this.speciesRequests.push( this.GS.getEntityByPage
                            <AbstractData<Species>, IAbstractData<Species>, Species, ISpecies>
                            (this.speciesPath, AbstractData, Species, i.toString()) );
                    }
                })
            )),
            map(() => true)
        )
    }

    /**
     * Handler for the requests array
     */
    public getRestSpecies(): Observable<boolean> {
        return forkJoin(this.speciesRequests).pipe(
            map((res: AbstractData<Species>[]) => {
                res.forEach(data => {
                    this.allSpecies.push(...data.results);
                });
            }),
            map(() => true)
        )
    }

    public getFirstPageStarships(): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.GS.getEntity
            <AbstractData<Starship>, IAbstractData<Starship>, Starship, IStarship>
            (this.starshipsPath, AbstractData, Starship).pipe(
                map((res: AbstractData<Starship>) => {

                    this.allStarships.push(...res.results);

                    return res.count; 
                    
                }),
                tap((count) => {

                    // 10 starships per page
                    // let compute a number of pages
                    const numOfPages = Math.ceil(count / 10);

                    // the first page of starships we already have
                    // so let get the rest
                    for (let i = 2; i <= numOfPages; i++) {
                        this.starshipsRequests.push( this.GS.getEntityByPage
                            <AbstractData<Starship>, IAbstractData<Starship>, Starship, IStarship>
                            (this.starshipsPath, AbstractData, Starship, i.toString()) );
                    }
                })
            )),
            map(() => true)
        )
    }

    /**
     * Handler for the requests array
     */
    public getRestStarships(): Observable<boolean> {
        return forkJoin(this.starshipsRequests).pipe(
            map((res: AbstractData<Starship>[]) => {
                res.forEach(data => {
                    this.allStarships.push(...data.results);
                });
            }),
            map(() => true)
        )
    }
}
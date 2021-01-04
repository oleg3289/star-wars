import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { Character } from "../models/character";
import { Film } from "../models/film";

@Injectable()
export class GetService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object,
        private http: HttpClient
    ) {}

    /**
     * Get the list of Star Wars characters passing a certain page
     * 
     * @param col 
     * @param c 
     * @param pageNum 
     */
    public getEntityByPage<T extends I, I, U extends D, D>(col: string, c: {new(i: I) : T}, sc: {new(i: D) : U}, pageNum: string): Observable<T> {
        return this.http.get<I>( `${environment.api}/${col}/`, { params: { page: pageNum } } )
        .pipe(
            map((res: I) => {
                return <T> new c(Object.assign(res, {resultsType: sc}));
            }),
            catchError((err) => {
                this.logErr(err)
                return of(null)
            })
        )
    }

    public getEntity<T extends I, I, U extends D, D>(col: string, c: {new(i: I) : T}, sc: {new(i: D) : U}): Observable<T> {
        return this.http.get<I>( `${environment.api}/${col}/` )
        .pipe(
            map((res: I) => {
                return <T> new c(Object.assign(res, {resultsType: sc}));
            }),
            catchError((err) => {
                this.logErr(err)
                return of(null)
            })
        )
    }

    // Error Handler
    public logErr(err: Error): void {
        console.log(`GetService: `, err)
    }
}
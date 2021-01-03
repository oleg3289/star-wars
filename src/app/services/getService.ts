import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

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
    public getPeopleByPage<T extends I, I>(col: string, c: {new(i: I) : T}, pageNum: string): Observable<T> {
        return this.http.get<I>( `${environment.api}/${col}/`, { params: { page: pageNum } } )
        .pipe(
            map((res: I) => {
                return <T> new c(res);
            }),
            catchError((err) => {
                this.logErr(err)
                return of(null)
            })
        )
    }

    public getFilms<T extends I, I>(col: string, c: {new(i: I) : T}): Observable<T> {
        return this.http.get<I>( `${environment.api}/${col}/` )
        .pipe(
            map((res: I) => {
                return <T> new c(res);
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
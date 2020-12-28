import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable()
export class GetService {
    public isBrowser: boolean;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object,
        private http: HttpClient
    ) {
        this.isBrowser = isPlatformBrowser(PLATFORM_ID);
    }

    public getSongsData<T extends I, I>(col: string, c: {new(i: I) : T}): Observable<T[]> {
        return this.http.get<I[]>(`${environment.api}/${col}`)
            .pipe(
                map((res: I[]) => {
                    return <T[]> res.map((i: I) => {
                        return new c(i);
                    })
                }),
                catchError((err) => {
                    this.logErr(err)
                    return of(null)
                })
            )
    }

    public logErr(err: Error): void {
        console.log(`GetService: `, err)
    }
}
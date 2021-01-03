import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppStorageService } from '../services/appStorage';
import { mergeMap, tap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ApiDataResolver implements Resolve<boolean>{

    constructor(
        private router: Router,
        private AS: AppStorageService
        ){}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        return of(true).pipe(
            mergeMap(() => this.AS.getFirstPagePeople()),
            switchMap(() => this.AS.getRestPeople()),
            switchMap(() => this.AS.getMovies()),
            tap(() => this.AS.isDataReady$.next()),
            map(() => true)
        )
    }
}
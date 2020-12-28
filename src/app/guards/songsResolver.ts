import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppStorageService } from '../services/appStorage';
import { mergeMap, tap, map } from 'rxjs/operators';

@Injectable()
export class SongsResolver implements Resolve<boolean>{

    constructor(
        private router: Router,
        private ASS: AppStorageService
        ){}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean>{
        return of(true).pipe(
            mergeMap(() => this.ASS.getSongs()),
            tap(() => console.log(this.ASS.songs)),
            map(() => true)
        )
    }
}
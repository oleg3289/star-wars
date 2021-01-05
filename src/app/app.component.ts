import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AppStorageService } from './services/appStorage';
     
@Component({
    selector: 'app-root',
    templateUrl: 'app.template.html',
    // styleUrls: ['app.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

    public isLoading: boolean = false;

    @ViewChild(MatDrawer, {static: true}) private matDrawer: MatDrawer;
    
    constructor(
        private AS: AppStorageService
    ) {}

    ngOnInit(): void {        
        this.AS.isDataReady$.subscribe(() => {
            this.isLoading = true;
        });
    }

    ngAfterViewInit(): void {}
}
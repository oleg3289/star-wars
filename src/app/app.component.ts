import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID,
    Renderer2,
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
    private cubeElems: ElementRef[] = null;

    public isLoading: boolean = false;

    @ViewChild(MatDrawer, {static: true}) private matDrawer: MatDrawer;
    
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private elemRef: ElementRef,
        private AS: AppStorageService
    ) {}

    ngOnInit(): void {
        this.cubeElems = this.elemRef.nativeElement.querySelectorAll('.cube');
        
        this.AS.isDataReady$.subscribe(() => {
            this.isLoading = true;
        });
    }

    ngAfterViewInit(): void {}

    public initAnime(): void {
        if (!this.matDrawer.opened) {
            this.cubeElems.forEach((item: ElementRef)=>{
                this.renderer.removeClass(item, 'rotateLeft');
                this.renderer.addClass(item, 'rotateRight');
            })
        } else {
            this.cubeElems.forEach((item: ElementRef)=>{
                this.renderer.removeClass(item, 'rotateRight');
                this.renderer.addClass(item, 'rotateLeft');
            })
        }
    }
}
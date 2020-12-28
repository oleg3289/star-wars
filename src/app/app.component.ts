import { Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Renderer2, ElementRef, Inject, OnInit, PLATFORM_ID, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppStorageService } from './services/appStorage';
     
@Component({
    selector: 'app-root',
    templateUrl: 'app.template.html',
    // styleUrls: ['app.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    private isMatMenuOpen: boolean = false;
    private cubeElems: ElementRef[] = null;

    public isBrowser: boolean = false;
    public isLoading: boolean = false;

    @ViewChild(MatDrawer, {static: true}) private matDrawer: MatDrawer;
    
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private elemRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private http: HttpClient,
        private ASS: AppStorageService
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.isLoading = true;
            }
            if(event instanceof NavigationEnd){
                this.isLoading = false;
              }
        })
    }

    public ngOnInit(): void {
        this.cubeElems = this.elemRef.nativeElement.querySelectorAll('.cube');

        this.ASS.getSongs();
        console.log(this.ASS.songs);
    }

    ngAfterViewInit(): void {
        this.cdRef.detectChanges()
    }

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

    public openMenu(): void {
        !this.matDrawer.opened ? this.matDrawer.open() : this.matDrawer.close();
    }

    public customClose(event): void {
        const target = event.target;
        if (this.matDrawer.opened && target.classList.contains('dark-layout')) {
            this.initAnime();
            this.matDrawer.close();
        }
    }
}
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from './app.routing';
import { HttpClientModule }    from '@angular/common/http';
import { AppStorageService } from './services/appStorage';
import { GetService } from './services/getService';
import { SongsResolver } from './guards/songsResolver';
import { VanillaModule } from './components/vanilla/vanilla.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from './components/search/search.module';

@NgModule({
    imports:      [ 
        BrowserModule, 
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule.forRoot(APP_ROUTING),
        HttpClientModule,
        VanillaModule,
        SearchModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
        AppStorageService,
        GetService,
        SongsResolver
    ]
})
export class AppModule {}
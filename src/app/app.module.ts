import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routing';
import { CharactersBoardModule } from './modules/characters-board/characters-board.module';
import { ApiDataResolver } from './guards/apiDataResolver';
import { AppStorageService } from './services/appStorage';
import { GetService } from './services/getService';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CharactersBoardService } from './modules/characters-board/characters-board.service';

@NgModule({
    imports:      [ 
        BrowserModule, 
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule.forRoot(APP_ROUTING),
        HttpClientModule,
        CharactersBoardModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
        AppStorageService,
        GetService,
        ApiDataResolver,
        CharactersBoardService
    ]
})
export class AppModule {}
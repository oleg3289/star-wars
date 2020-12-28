import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { SongsResolver } from './guards/songsResolver';

export const APP_ROUTING: Routes = [
    {path: '', resolve: {isSongsReady: SongsResolver}, component: AppComponent, pathMatch: 'full'},
    // {path: '**', component: NotFoundComponent}
]
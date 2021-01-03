import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { ApiDataResolver } from './guards/apiDataResolver';

export const APP_ROUTING: Routes = [
    { path: '', resolve: { isPeopleReady: ApiDataResolver }, component: AppComponent, pathMatch: 'full' },
    // {path: '**', component: NotFoundComponent}
]
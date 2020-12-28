import { NgModule } from "@angular/core";
import { SearchComponent } from './search.component';
import { SearchRowComponent } from './search-row/search-row.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatButtonModule
    ],
    declarations: [
        SearchComponent,
        SearchRowComponent
    ],
    exports: [SearchComponent]
})
export class SearchModule {}
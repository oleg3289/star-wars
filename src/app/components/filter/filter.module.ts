import { NgModule } from "@angular/core";
import { FilterComponent } from './filter.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { SliderModule } from 'primeng/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        SliderModule,
        MatSlideToggleModule
    ],
    declarations: [FilterComponent],
    exports: [FilterComponent]
})
export class FilterModule {}
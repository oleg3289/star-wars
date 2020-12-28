import { NgModule } from "@angular/core";
import { VanillaComponent } from './vanilla.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [VanillaComponent],
    exports: [VanillaComponent]
})
export class VanillaModule {}
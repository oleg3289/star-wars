import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CharacterDetailsComponent } from "./character-details.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CharacterDetailsComponent],
    exports: [CharacterDetailsComponent]
})
export class CharacterDetailsModule {}
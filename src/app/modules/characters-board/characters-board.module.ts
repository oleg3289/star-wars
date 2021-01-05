import { NgModule } from "@angular/core";
import { CharactersBoardComponent } from "./characters-board.component";
import { CommonModule } from "@angular/common";
import { FilterModule } from "src/app/components/filter/filter.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialogModule } from '@angular/material/dialog';
import { CharacterDetailsModule } from "src/app/components/character-details/character-details.module";

@NgModule({
    imports: [
        CommonModule,
        FilterModule,
        DragDropModule,
        MatDialogModule,
        CharacterDetailsModule
    ],
    declarations: [CharactersBoardComponent],
    exports: [CharactersBoardComponent]
})
export class CharactersBoardModule {}
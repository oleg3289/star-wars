import { NgModule } from "@angular/core";
import { CharactersBoardComponent } from "./characters-board.component";
import { CommonModule } from "@angular/common";
import { FilterModule } from "src/app/components/filter/filter.module";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    imports: [
        CommonModule,
        FilterModule,
        DragDropModule
    ],
    declarations: [CharactersBoardComponent],
    exports: [CharactersBoardComponent]
})
export class CharactersBoardModule {}
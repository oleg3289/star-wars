import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppStorageService } from "src/app/services/appStorage";
import { CharactersBoardService } from "./characters-board.service";

@Component({
    selector: 'app-characters-board',
    templateUrl: 'characters-board.template.html',
    styleUrls: ['characters-board.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharactersBoardComponent implements OnInit, AfterViewInit {

    constructor(
        private AS: AppStorageService,
        public CBS: CharactersBoardService
    ) {}

    ngOnInit(): void {
        this.CBS.allCharacters = this.AS.allCharacters;
        this.CBS.filteredCharacters = this.CBS.allCharacters;
    }

    ngAfterViewInit(): void {}

    // Drag & Drop methods
    public drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }
}
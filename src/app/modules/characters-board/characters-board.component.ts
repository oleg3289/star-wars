import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Person } from "src/app/models/character";
import { AppStorageService } from "src/app/services/appStorage";

@Component({
    selector: 'app-characters-board',
    templateUrl: 'characters-board.template.html',
    styleUrls: ['characters-board.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharactersBoardComponent implements OnInit, AfterViewInit {
    private _allCharacters: Person[] = [];
    public filteredCharacters: any[] = [];
    public favoriteCharacters: Person[] = [];

    constructor(
        private AS: AppStorageService
    ) {}

    ngOnInit(): void {
        this._allCharacters = this.AS.allCharacters;
        this.filteredCharacters = this.allCharacters;

        this._allCharacters = this.AS.allCharacters;
    }

    ngAfterViewInit(): void {}

    get allCharacters(): Person[] {
        return this._allCharacters;
    }

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
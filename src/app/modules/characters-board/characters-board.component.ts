import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CharacterDetailsComponent } from "src/app/components/character-details/character-details.component";
import { Character } from "src/app/models/character";
import { AppStorageService } from "src/app/services/appStorage";
import { CharactersBoardService } from "./characters-board.service";

@Component({
    selector: 'app-characters-board',
    templateUrl: 'characters-board.template.html',
    styleUrls: ['characters-board.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharactersBoardComponent implements OnInit, AfterViewInit {
    public characterListId = 'characterList';
    public favoriteListId = 'favoriteList';

    constructor(
        private AS: AppStorageService,
        public CBS: CharactersBoardService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.CBS.allCharacters = this.AS.allCharacters;
        this.boardFilterCharacters(false);

        this.CBS.filteredCharacters = this.CBS.allCharacters;
    }

    ngAfterViewInit(): void {}

    // Drag & Drop methods
    public drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            this.saveFavoritesLocal(event);

            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }

    private saveFavoritesLocal(event) {
        const CHARACTER_ID: number = event.item.element.nativeElement.id;
        if (event.previousContainer.id === this.characterListId) {
            let favoritesIds: number[] = this.getLocalFavoritesIds();
            
            if (!favoritesIds.includes(CHARACTER_ID)) favoritesIds.push(CHARACTER_ID);
            
            localStorage.setItem('favorites', JSON.stringify(favoritesIds));

            this.boardFilterCharacters(true);
        }
        // event.
    }

    // Remove items in allCharacters that are in 'favorites' local storage array
    // and add them to favoriteCharacters array
    private async boardFilterCharacters(isDropped: boolean) {
        let favoritesIds: number[] = this.getLocalFavoritesIds();

        this.CBS.allCharacters = this.CBS.allCharacters.filter((ch: Character) => {
            let isInFavoritesArray: boolean = favoritesIds.includes(ch.id);

            if (isInFavoritesArray && !isDropped) this.CBS.favoriteCharacters.push(ch);

            return !isInFavoritesArray;
        })
    }

    private getLocalFavoritesIds() {
        let favoritesIdsStr: string|null = localStorage.getItem('favorites');
        let favoritesIds: number[] = [];
        
        if (favoritesIdsStr) favoritesIds = JSON.parse(favoritesIdsStr).map((i: string) => +i);

        return favoritesIds;
    }

    public openCharacterDetails(item: Character) {
        const dialogRef = this.dialog.open(CharacterDetailsComponent, {
            height: '250px',
            width: '440px',
            data: item
        });

        dialogRef.afterClosed().subscribe();
    }
}
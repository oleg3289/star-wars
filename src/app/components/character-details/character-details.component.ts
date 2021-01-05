import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from "src/app/models/character";
import { AppStorageService } from "src/app/services/appStorage";

export interface IAbstractItem {
    id: number;
    name: string;
    title: string;
}

@Component({
    selector: 'app-character-details',
    templateUrl: 'character-details.template.html',
    styleUrls: ['character-details.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CharacterDetailsComponent {
    public character: Character = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Character,
        private AS: AppStorageService
    ) {
        this.character = data;
    }

    public getEntitiesByIds(ids: number[], entity: string) {
        const ITEMS: IAbstractItem[] = this.AS[entity].filter((s: IAbstractItem) => {
            return ids.includes(s.id);
        })

        return ITEMS.length ? ITEMS.map((s: IAbstractItem) => entity === 'allFilms' ? s.title : s.name).join(', ') : '...';
    }
}
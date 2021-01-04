import { Injectable } from "@angular/core";
import { Character } from "src/app/models/character";

@Injectable()
export class CharactersBoardService {
    public allCharacters: Character[] = [];
    public filteredCharacters: Character[] = [];
    public favoriteCharacters: Character[] = [];

    constructor() {}
}
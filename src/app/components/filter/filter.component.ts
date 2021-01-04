import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Character } from "src/app/models/character";
import { Film } from "src/app/models/film";
import { Species } from "src/app/models/species";
import { CharactersBoardService } from "src/app/modules/characters-board/characters-board.service";
import { AppStorageService } from "src/app/services/appStorage";

export interface IFilmsObj {
    id: number;
    episode_id: number;
    titleName: string;
    selected: boolean;
}

export interface ISpeciesObj {
    id: number;
    name: string;
    selected: boolean;
}

@Component({
    selector: 'app-filter',
    templateUrl: 'filter.template.html',
    styleUrls: ['filter.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit, AfterViewInit {
    public filmList: Film[] = [];
    public speciesList: Species[] = [];

    public filterForm: FormGroup;

    public filmsObj: IFilmsObj[] = [];

    public selectedSpeciesId: number[] = [];

    public minYear: number = 0;
    public maxYear: number = 35;
    public step: number = 1;
    public birthYearsRange: number[] = [];
    
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private AS: AppStorageService,
        private formBuilder: FormBuilder,
        public CBS: CharactersBoardService,
        private renderer: Renderer2
    ) {
        this.filterForm = this.formBuilder.group({
            films: new FormArray([]),
            species: new FormControl(''),
            birthYears: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.filmList = this.AS.allFilms;
        this.setFilmsObj();

        this.speciesList = this.AS.allSpecies;
        
        this.addCheckboxes();
    }

    ngAfterViewInit(): void {
        // Subscription on film checkbox changing
        this.filterForm.get('films').valueChanges.subscribe((state: boolean[]) => {

            state.forEach((s: boolean, i: number) => {
                this.filmsObj[i].selected = s;
            });

            this.initFilter();
        })
        // Subscription on species select changing
        this.filterForm.get('species').valueChanges.subscribe((data) => {

            this.selectedSpeciesId = data;

            this.initFilter();
        })
        // Subscription on birth year slider changing
        this.filterForm.get('birthYears').valueChanges.subscribe((data) => {
            
            this.birthYearsRange = data;
            
            this.fixOnEqualPrice();
            this.initFilter();
        })
    }

    ////////////////////////////// Getters
    get filmsFormArray() {
        return this.filterForm.controls.films as FormArray;
    }

    // get correctBirthYears(): string {
    //     let startPoint: number = this.birthYearsRange[0] - 30;
    //     let endPoint: number = this.birthYearsRange[1] - 30;

    //     let startYear: string = this.getYearStr(startPoint);
    //     let endYear: string = this.getYearStr(endPoint);

    //     return startYear + ' - ' + endYear;
    // }
    // //////////////////////////////////////

    // private getYearStr(year: number) {
    //     if (year < 0) {
    //         return `${Math.abs(year)} BBY`;
    //     } else if (year > 0) {
    //         return `${Math.abs(year)} ABY`;
    //     } else {
    //         return year.toString();
    //     }
    // }

    private setFilmsObj(): void {
        // set selected films array
        this.filmList.forEach((f: Film, i: number) => {
            this.filmsObj.push({
                id: i,
                episode_id: f.episode_id,
                titleName: f.title,
                selected: false
            })
        });

        // sort films by episodes
        this.filmsObj.sort((a, b) => {
            return a.episode_id - b.episode_id;
        })
    }

    private addCheckboxes() {
        this.filmsObj.forEach(() => this.filmsFormArray.push(new FormControl(false)));
    }

    private initFilter(): void {
        const SELECTED_FILMS: number[] = [];
        this.filmsObj.forEach((t) => t.selected ? SELECTED_FILMS.push(t.episode_id) : null );

        // if there are no selected filmsObj, then select all
        if (!SELECTED_FILMS.length && !this.selectedSpeciesId.length) {
            this.CBS.filteredCharacters = this.CBS.allCharacters;
            return;
        }

        this.CBS.filteredCharacters = this.CBS.allCharacters.filter((ch: Character) => {
            let isMatchFilms = true;
            let isMatchSpecies = true;
            if (SELECTED_FILMS.length) isMatchFilms = SELECTED_FILMS.every((st: number) => ch.episode_ids.includes(st));
            if (this.selectedSpeciesId.length) isMatchSpecies = this.selectedSpeciesId.every((ssi: number) => ch.species_ids.includes(ssi));

            return isMatchFilms && isMatchSpecies;
        })
    }

    // Range slider
    // 236px - slider width
    private fixOnEqualPrice(): void {
        const leftBut = <HTMLElement>this.document.querySelectorAll('.p-slider-handle')[0];
        const rightBut = <HTMLElement>this.document.querySelectorAll('.p-slider-handle')[1];

        if (this.birthYearsRange[1] === this.birthYearsRange[0]) {
            this.renderer.addClass(leftBut, 'p-slider-handle_equal-left');
            this.renderer.addClass(rightBut, 'p-slider-handle_equal-right');
        } else {
            this.renderer.removeClass(leftBut, 'p-slider-handle_equal-left')
            this.renderer.removeClass(rightBut, 'p-slider-handle_equal-right')
        }
    }
}
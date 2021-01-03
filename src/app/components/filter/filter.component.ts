import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Film } from "src/app/models/film";
import { AppStorageService } from "src/app/services/appStorage";

@Component({
    selector: 'app-filter',
    templateUrl: 'filter.template.html',
    styleUrls: ['filter.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
    private _filmList: Film[] = [];
    public checked: Film = null;

    public filterForm: FormGroup;
    
    constructor(
        private AS: AppStorageService
    ) {
        this.filterForm = new FormGroup({
            'films': new FormControl('')
        })
    }

    ngOnInit(): void {
        this._filmList = this.AS.allFilms;
        console.log(this.filmList)
        this.checked = this.filmList[0];
    }

    get filmList(): Film[] {
        return this._filmList;
    }
}
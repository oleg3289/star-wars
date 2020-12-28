import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-search-row',
    templateUrl: 'search-row.template.html',
    styleUrls: ['search-row.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchRowComponent {
    public value: string = ``;

    constructor() {}
}
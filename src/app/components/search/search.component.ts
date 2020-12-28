import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from "@angular/core";

@Component({
    selector: 'app-search',
    templateUrl: 'search.template.html',
    // styleUrls: ['search.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
    
    constructor() {}

    public ngOnInit(): void {}
}
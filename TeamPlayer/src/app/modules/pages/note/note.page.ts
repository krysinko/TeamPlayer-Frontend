import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';

@Component({
    selector: 'app-note',
    templateUrl: './note.page.html',
    styleUrls: [ './note.page.scss' ],
})
export class NotePage implements OnInit {
    title: string;

    constructor(private appPages: AppPages, private location: Location) {
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }

}

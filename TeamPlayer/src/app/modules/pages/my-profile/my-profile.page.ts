import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.page.html',
    styleUrls: [ './my-profile.page.scss' ],
})
export class MyProfilePage implements OnInit {
    title: string;

    constructor(private appPages: AppPages, private location: Location) {
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }

}

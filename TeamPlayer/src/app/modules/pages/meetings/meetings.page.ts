import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';
import { MeetingsService } from '../../../services/meetings.service';
import { Observable } from 'rxjs';
import { Meeting } from '../../../models/meeting';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-meetings',
    templateUrl: './meetings.page.html',
    styleUrls: [ './meetings.page.scss' ],
})
export class MeetingsPage implements OnInit {
    title: string;
    meetings$: Observable<Meeting[]>;

    constructor(
        private appPages: AppPages,
        private location: Location,
        private meetingsService: MeetingsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.getMeetings();
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }

    goToMeetingDetails(id: number) {
        this.router.navigate([ 'meeting-details/' + id ], { relativeTo: this.route });
    }

    goToCreatingMeeting() {
        this.router.navigate([ 'new' ], { relativeTo: this.route });
    }

    private getMeetings() {
        this.meetings$ = this.meetingsService.getUsersMeetings();
    }
}

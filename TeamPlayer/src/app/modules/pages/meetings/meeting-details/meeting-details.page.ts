import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MeetingsService } from '../../../../services/meetings.service';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '../../../../models/meeting';

@Component({
    selector: 'app-meeting-details',
    templateUrl: './meeting-details.page.html',
    styleUrls: [ './meeting-details.page.scss' ],
})
export class MeetingDetailsPage implements OnInit {
    meetingId: number;
    meeting$: BehaviorSubject<Meeting> = new BehaviorSubject<Meeting>(null);

    get meeting(): Meeting {
        return this.meeting$.value;
    }

    set meetingValue(data: Meeting) {
        this.meeting$.next(data);
    }

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private meetingService: MeetingsService) {
        this.getMeetingSubscriptionById();
    }

    ngOnInit() {
    }

    private getMeetingSubscriptionById(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    this.meetingId = Number(params.get('id'));
                    return this.meetingService.getMeeting(this.meetingId);
                })
            )
            .subscribe((meeting: Meeting) => {
                this.meetingValue = meeting;
                console.log(this.meeting$.value);
            });
    }
}

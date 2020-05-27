import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MeetingsService } from '../../../../services/meetings.service';
import { BehaviorSubject, of } from 'rxjs';
import { Meeting } from '../../../../models/meeting';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-meeting-details',
    templateUrl: './meeting-details.page.html',
    styleUrls: [ './meeting-details.page.scss' ],
})
export class MeetingDetailsPage implements OnInit {
    meetingId: number;
    meeting$: BehaviorSubject<Meeting> = new BehaviorSubject<Meeting>(null);
    meetingEditForm: FormGroup;

    get meeting(): Meeting {
        return this.meeting$.value;
    }

    set meetingValue(data: Meeting) {
        this.meeting$.next(data);
    }

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private meetingService: MeetingsService,
        private formBuilder: FormBuilder) {
        this.getMeetingSubscriptionById();
    }

    ngOnInit() {
    }

    saveMeeting() {
        console.log(this.meetingEditForm.value);
        this.meetingService.saveMeeting(this.meetingEditForm.value);
    }

    private getMeetingSubscriptionById(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    if (params.keys.length) {
                        this.meetingId = Number(params.get('id'));
                        return this.meetingService.getMeeting(this.meetingId);
                    }
                    return of<Meeting>(null);
                })
            )
            .subscribe((meeting: Meeting) => {
                if (meeting) {
                    this.meetingValue = meeting;
                }
                this.buildMeetingForm();
                this.subscribeOnMeetingFormChangesToUpdate();
                console.log(this.meeting$.value, meeting);
            });
    }

    private buildMeetingForm() {
        const meeting: Meeting = this.meeting$.value;
        if (meeting) {
            this.meetingEditForm = this.formBuilder.group({
                name: [ meeting.name, Validators.required ],
                description: [ meeting.name, Validators.required ],
                date: [ meeting.date, Validators.required ],
                participants: [ meeting.participants ]
            });
        } else {
            this.meetingEditForm = this.formBuilder.group({
                name: [ '', [ Validators.required, Validators.maxLength(255),
                    Validators.minLength(1) ] ],
                description: [ '', [ Validators.required, Validators.maxLength(255),
                    Validators.minLength(1) ] ],
                date: [ '', Validators.required ],
                participants: []
            });
        }
    }

    private subscribeOnMeetingFormChangesToUpdate() {
        this.meetingEditForm.valueChanges.subscribe((data: Meeting) => {
            if (this.meeting$.value) {
                this.meetingService.updateMeeting({...this.meeting$.value, ...data});
            }
        });
    }
}

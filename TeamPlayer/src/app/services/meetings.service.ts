import { Injectable } from '@angular/core';
import { MeetingsApiService } from './api/meetings-api.service';
import { UserService } from './user.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Meeting } from '../models/meeting';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {
    apiErrorMessage,
    dataNotFoundErrorMessage,
    forbiddenErrorMessage,
    unauthorizedErrorMessage
} from '../models/texts/taskDescriptions';

@Injectable({
    providedIn: 'root'
})
export class MeetingsService {
    get meetings$(): Observable<Meeting[]> {
        return this._meetings$;
    }

    set meetings(data: Meeting[]) {
        this._meetings$.next(data);
    }

    private _user$: Observable<User>;
    private _meetings$: BehaviorSubject<Meeting[]> = new BehaviorSubject(null);

    constructor(private meetingsApiService: MeetingsApiService, private userService: UserService, private router: Router) {
        this._user$ = this.userService.user;
    }

    getUsersMeetings(): Observable<Meeting[]> {
        return this.userService.getUserData()
            .pipe(
                switchMap((user: User) => this.meetingsApiService.getMeetingsByUser(user.id)),
                map((meetings: Meeting[]) => {
                    this.meetings = meetings;
                    console.log(meetings);
                    return meetings;
                }),
                catchError((error: HttpErrorResponse) => this.handleApiError(error))
            );
    }

    getMeeting(meetingId: number): Observable<Meeting> {
        return this.meetingsApiService.getMeetingById(meetingId)
            .pipe(
                catchError((error: HttpErrorResponse) => this.handleApiError(error))
            );
    }

    saveMeeting(data: Meeting) {
        return this.userService.getUserData()
            .pipe(
                switchMap((user: User) =>
                    this.meetingsApiService.postNewMeeting({ ...data, creator: user })),
                catchError((err: HttpErrorResponse) => this.handleApiError(err)))
            .subscribe((m: Meeting) => {
                this.getUsersMeetings();
                this.router.navigate([ '/meetings/meeting-details/' + m.id ]);
            });
    }

    updateMeeting(data: Meeting) {
        this.meetingsApiService.updateMeeting(data)
            .pipe(catchError((err: HttpErrorResponse) => this.handleApiError(err)))
            .subscribe((m: Meeting) => {
                this.getUsersMeetings();
            });
    }

    private handleApiError(err: HttpErrorResponse): Observable<any> {
        console.log(err);
        let message: string;
        // let userLoginStatus: boolean;
        switch (err.status) {
            case 500:
                message = apiErrorMessage;
                break;
            case 401:
                message = unauthorizedErrorMessage;
                // userLoginStatus = this.checkIfUserLoggedIn();
                break;
            case 403:
                message = forbiddenErrorMessage;
                // userLoginStatus = this.checkIfUserLoggedIn();
                break;
            case 404:
                message = dataNotFoundErrorMessage;
                break;
        }
        return of<Meeting>(null);
    }
}

import { Injectable } from '@angular/core';
import { MeetingsApiService } from './api/meetings-api.service';
import { UserService } from './user.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Meeting } from '../models/meeting';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Project } from '../models/project';

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

    constructor(private meetingsApiService: MeetingsApiService, private userService: UserService) {
        this._user$ = this.userService.user;
    }

    getUsersMeetings(): Observable<Meeting[]> {
        return this.userService.getUserData()
            .pipe(
                switchMap((user: User) => this.meetingsApiService.getMeetings(user.id)),
                map((meetings: Meeting[]) => {
                    this.meetings = meetings;
                    console.log(meetings);
                    return meetings;
                }),
                catchError((error: HttpErrorResponse) => {
                   return of(null);
                })
            );
    }
}

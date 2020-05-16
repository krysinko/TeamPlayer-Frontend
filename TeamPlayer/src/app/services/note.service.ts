import { Injectable } from '@angular/core';
import { NoteApiService } from './api/note-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    apiErrorMessage,
    dataNotFoundErrorMessage,
    forbiddenErrorMessage,
    unauthorizedErrorMessage
} from '../models/texts/taskDescriptions';
import { UserService } from './user.service';
import { Note } from '../models/note';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    constructor(private noteApiService: NoteApiService, private userService: UserService) {
    }

    getUserNotes(): Observable<Note[]> {
        return this.noteApiService.getNotesFromApi()
            .pipe(
                switchMap((notes: Note[]) => {
                    return of(notes.filter(note => {
                        return !!note.assignees.find((usr: User) => usr.id === this.userService.userId)
                            || note.poster.id === this.userService.userId;
                    }));
                }),
                map((note: Note[]) => {
                    note.map(n => {
                        n.project = n.project_id;
                    });
                    return note;
                }),
                catchError((err: HttpErrorResponse) => this.handleApiError(err)),
            );
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
        return of();
    }
}

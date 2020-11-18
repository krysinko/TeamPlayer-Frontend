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
import { Note, PostStatus } from '../models/note';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { NoteChecklist } from '../models/note-types';

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    constructor(private noteApiService: NoteApiService, private userService: UserService) {
        // this.fixAllNotes();
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

    getNoteById(id: number): Observable<Note> {
        return this.noteApiService.getNoteById(id).pipe(
            tap((note: Note) => {
                if (typeof note.content === 'string' && note.status === PostStatus.CHECKLIST) {
                    note.content = JSON.parse(note.content) as NoteChecklist[];
                    note.content.map((n: NoteChecklist) => {
                        n.saved = true;
                        n.checked = true;
                    });
                }
            }),
            catchError((err: HttpErrorResponse) => this.handleApiError(err)));
    }

    // private fixAllNotes() {
    //     this.noteApiService.getNotesFromApi().pipe(tap((notes: Note[]) => {
    //             notes.forEach((note: Note) => {
    //                 if (typeof note.content === 'string') {
    //                     const obj = [ new NoteChecklist(note.content, false) ];
    //                     note.content = JSON.stringify(obj);
    //                     console.log(note);
    //
    //                     this.noteApiService.updateNote(note).subscribe();
    //                 }
    //             });
    //         }),
    //         catchError((err: HttpErrorResponse) => this.handleApiError(err))
    // ).subscribe();
    // }

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

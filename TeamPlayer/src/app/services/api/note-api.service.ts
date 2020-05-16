import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, notesApiCreatedByUserPath, notesApiPath } from './endpoints';
import { Note } from '../../models/note';

@Injectable({
    providedIn: 'root'
})
export class NoteApiService {

    constructor(private http: HttpClient) {
    }

    getNotesFromApi(): Observable<Note[]> {
        return this.http.get<Note[]>(API_URL + notesApiPath);
    }

    postNote(note: Note): Observable<any> {
        return this.http.post(API_URL + notesApiPath, note);
    }

    getNoteById(id: number): Observable<Note> {
        return this.http.get<Note>(API_URL + notesApiPath + id);

    }

    getNotesCreatedByUser(id: number): Observable<Note[]> {
        return this.http.get<Note[]>(API_URL + notesApiCreatedByUserPath + id);
    }

    updateNote(note: Note): Observable<any> {
        return this.http.put(API_URL + notesApiPath + note.id, note);
    }
}

import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../../models/app-pages';
import { Location } from '@angular/common';
import { NoteService } from '../../../services/note.service';
import { Observable } from 'rxjs';
import { Note } from '../../../models/note';

@Component({
    selector: 'app-note',
    templateUrl: './note.page.html',
    styleUrls: [ './note.page.scss' ],
})
export class NotePage implements OnInit {
    title: string;
    notes$: Observable<Note[]>;

    constructor(private appPages: AppPages, private location: Location, private noteService: NoteService) {
        this.notes$ = this.noteService.getUserNotes();
    }

    ngOnInit() {
        this.title = this.appPages.getPageDetails(this.location.path()).title;
    }

}
